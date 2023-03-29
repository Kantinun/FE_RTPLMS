import env from "../config/env";
import moment from "moment";

export interface DetailResponse {
    id: string;
    name: string;
    performance: string
    checkInTime: string;
    checkOutTime: string;
    checkInStatus: string;
    otStatus: string;
    otDuration: number;
};
export interface DataForPlanAndOt {
    plan: Array<any>;
    ot: Array<any>;
}

export interface GetFreeWorkerResponse {
    account_id: string;
    fullname: string;
    performance: string;
}
export interface ModalAddData {
    account_id: any;
    name: string;
    performance: string;
    isChecked: boolean;
}

export const getShift_li = async (department_id: string, date: string) =>{
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/shifts/departments/${department_id}/${date}`)
    const json = await res.json();
    return json.error? []:dataHandler(json)
}

export const dataHandler = (data: any) => {
    return data[0].map((row)=>{
        return{
        shiftCode: String(row.shiftCode),
        shiftDate: String(row.shiftDate),
        shiftTime: String(row.shiftTime),
        success_product_in_shiftTime: parseFloat(row.success_product_in_shiftTime),
        success_product_in_OTTime: parseFloat(row.success_product_in_OTTime),
        product_target: parseFloat(row.product_target),
        entered: parseInt(row.checkInMember),
        member: parseInt(row.allMember),
        idealPerformance: parseInt(row.idealPerformance),
        actualPerformance: parseFloat(row.actual_performance)
        }
    })
  };

export const getAccountInThisShift = async (shiftCode: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/detail/shift/${shiftCode}`);
    const json = await res.json();
    return json.error? []:json;    
};

export const getDataForPlanAndOt = (accounts: DetailResponse[]) => {
    const dataForPlanAndOt = accounts.reduce((obj: DataForPlanAndOt, account) => {
        obj.plan.push({
            name: account.name, 
            account_id: account.id,
            checkInOut: `${!account.checkInTime||account.checkInTime==" "? '':moment(account.checkInTime, "HH:mm:ss").format("HH:mm")} - ${!account.checkOutTime||account.checkOutTime==" "? '':moment(account.checkOutTime, "HH:mm:ss").format("HH:mm")}`, 
            checkInStatus: account.checkInStatus,
            performance: account.performance
        });
        account.otStatus && (obj.ot.push({
            account_id: account.id,
            name: account.name, 
            performance: account.performance,
            otDuration: account.otDuration, 
            otStatus: account.otStatus
        }))
        
        return obj;
    }, {plan: [], ot: []});

    return dataForPlanAndOt
}

export const getFreeWorkers = async (managerId: string, shiftCode:string, date: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/work-on/managers/${managerId}/shifts/${shiftCode}/${moment(date).format("YYYY-MM-DD")}`);
    const json = await res.json()
        .then((arrObj: GetFreeWorkerResponse[])=>{
            const newArrObj = !arrObj.statusCode? arrObj.map((account: GetFreeWorkerResponse)=>{
                return {
                    name: account.fullname,
                    account_id: account.account_id,
                    performance: account.performance,
                    isChecked: false,
                }
            }): []
            return newArrObj;
        });

    return json;   
}

export const addWorker = async (data: any) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        }

    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/work-on/`, requestOptions);
    const json = await res.json()
    return json
}

export const delWorker = async (data: any) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        }

    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/work-on/`, requestOptions);
    const json = await res.json()
    return json
}

export const getShiftStatus = async (id: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/shifts/${id}`);
    const json = await res.json();

    return json.error? null: json;
}

export const getShiftPrediction =async (shift_code: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/detail/prediction/${shift_code}`)
    const json = await res.json();
    return json
}
import env from "../config/env";

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
    name: string;
    id: string;
    performance: string;
    isChecked: boolean;
}
export const getAccountInThisShift = async (shiftCode: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/detail/shift/${shiftCode}`);
    const json = await res.json();

    return json;    
};

export const getDataForPlanAndOt = (accounts: DetailResponse[]) => {
    const dataForPlanAndOt = accounts.reduce((obj: DataForPlanAndOt, account) => {
        obj.plan.push({
            name: account.name, 
            id: account.id,
            checkInOut: `${account.checkInTime} - ${account.checkOutTime === '-' ? '':account.checkOutTime}`, 
            checkInStatus: account.checkInStatus,
            performance: account.performance
        });
        account.otStatus && (obj.ot.push({
            name: account.name, 
            otDuration: account.otDuration, 
            otStatus: account.otStatus
        }))
        
        return obj;
    }, {plan: [], ot: []});

    return dataForPlanAndOt
}

export const getFreeWorkers = async (managerId: string, date: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/work-on/manager/${managerId}/${date}`);
    const json = await res.json()
        .then((arrObj: GetFreeWorkerResponse[])=>{
            const newArrObj = arrObj.map((account: GetFreeWorkerResponse)=>{
                return {
                    name: account.fullname,
                    id: account.account_id,
                    performance: account.performance,
                    isChecked: false,
                }
            });
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
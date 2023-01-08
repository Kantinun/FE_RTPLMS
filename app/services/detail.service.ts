import env from "../config/env";

export interface DetailResponse {
    name: string;
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
export const getAccountInThisShift = async (shiftCode: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/detail/shift/${shiftCode}`);
    const json = await res.json();

    return json;    
};

export const getDataForPlanAndOt = (accounts: DetailResponse[]) => {
    const dataForPlanAndOt = accounts.reduce((obj: DataForPlanAndOt, account) => {
        obj.plan.push([
            account.name, 
            account.checkInTime==null ? '-' : account.checkInTime, 
            account.checkOutTime==null ? '-' : account.checkOutTime, 
            account.checkInStatus
        ])
        obj.ot.push([
            account.name, 
            account.otDuration==null ? '-' : account.otDuration, 
            account.otStatus
        ])
        
        return obj;
    }, {plan: [], ot: []});

    return dataForPlanAndOt
}
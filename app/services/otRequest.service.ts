import env from "../config/env";
const moment = require('moment');

export interface OtRequestResponse {
    shift_code: string,
    date: string;
    number_of_hour: string;
    req_status: string;
    create_at: string;
    work_time: string;
}
interface UpdateRequest {
    shift_code: string;
    account_id: string;
    req_status: string;
}

interface DeleteRequest{
    mngId: string;
    shiftCode: string;
    accountIds: string[];
}

export const getOtRequest = async (accId: string) => {
    
    // Retrives TaskPlan
    const otRequestResponse: OtRequestResponse[] = await fetch(`${env.API_BASE}:${env.API_PORT}/ot-request/accounts/${accId}`).then(res =>{
        return res.json().then(json=>(json));
    })
    .catch(e=>{console.log(e)});
    return otRequestResponse;
}

export const updateRequest = async (id: string, shiftCode: string, status: string) => {
    const data: UpdateRequest = {
        shift_code: shiftCode,
        account_id: id,
        req_status: status
    };
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        }

    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/request/`, requestOptions);
    const json = await res.json()
    return json
}

export const deleteRequest = async (mng_id: string, shiftCode: string, accountIds: string[]) => {
    const data: DeleteRequest = {
        mngId: mng_id,
        shiftCode: shiftCode,
        accountIds: accountIds,
    }
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        }
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/request/`, requestOptions);
    // const json = await res.json()
    // return json
}
import env from "../config/env";
import moment from "moment";

export interface Log {
    log_id: string;
    action: string;
    details: {
        department: string,
        department_id: string,
        account_id: Array<string>
    };
    mng_id: string;
    create_at: string;
} 

export const getDataForLogScreen = async (mngId: string, date: string) => {

    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/log-screen/managers/${mngId}/${date}`);
    const json: Log[] = await res.json();
    return json;
}
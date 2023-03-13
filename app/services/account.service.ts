import env from "../config/env";

export interface Account {
    id: string;
    role: string;
}

export interface AccountProfile {
    account_id: string,
    username: string,
    password: string,
    fullname: string,
    role: string,
    telephone: string,
    performance: string,
    details: {
      data: string
    },
    mng_id: string;
}
export const initAccountProfile = {
    account_id: '',
    username: '',
    password: '',
    fullname: '',
    role: '',
    telephone: '',
    performance: '',
    details: {
      data: ''
    },
    mng_id: ''
}

export const doLogin = async (username: string, password: string) => {
    //  Prep. data for the request
    const data = {
        username: username,
        //  Need to encrypt password
        password: password
    }

    // Config request header
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    }
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/login`, requestOptions);
    const json: Account = await res.json();
    return json;
}

export const getAccountDetails = async (account_id: string) => {
    const res = await fetch(`${env.API_BASE}:${env.API_PORT}/accounts/${account_id}`);
    const json = await res.json();
    return json;
}
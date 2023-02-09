import env from "../config/env";

export interface Account {
    id: string;
    role: string;
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
import env from "../config/env";
const moment = require('moment');

interface TaskPlanData {
    checkin: string;
    checkout: string;
    department: string;
    shiftTime: string;
    status: string;
}
interface OtPlanData {
    department: string;
    shiftTime: string;
    OTHour: string;
}

interface TaskPlanDataResponse {
    department_name: string;
    checkin_time: string;
    checkout_time: string;
    checkin_status: string;
    shift_time: string;
    date: string;
}

interface OtPlanDataResponse {
    date: string;
    shift_time: string;
    number_of_hour: string;
    req_status: string;
    create_at: string;
    department_name: string;
}

export interface TaskPlanDateData {
    [key: string]: Array<TaskPlanData | OtPlanData>
}


export const getTaskPlanByAccountId = async (accId: string) => {
    
    // Retrives TaskPlan
    const taskPlanResponse: TaskPlanDataResponse[] = await fetch(`${env.API_BASE}:${env.API_PORT}/schedule/accounts/${accId}/work-schedule`).then(res =>{
        return res.json().then(json=>(json));
    })
    .catch(e=>{console.log(e)});

    // Retrives OTPlan
    const otPlanResponse: OtPlanDataResponse[] = await fetch(`${env.API_BASE}:${env.API_PORT}/schedule/accounts/${accId}/ot-schedule`).then(res =>{
        return res.json().then(json=>(json));
    })
    .catch(e=>{console.log(e)});
    
    // Re-format data
    const result = changeTaskPlanFormat(taskPlanResponse, otPlanResponse);
    
    return result;
}

const changeTaskPlanFormat = (taskPlanResponse: TaskPlanDataResponse[], otPlanResponse: OtPlanDataResponse[]) => {
    let result: TaskPlanDateData = {};
    
    // Formating TaskPlan
    taskPlanResponse.forEach((taskPlan: TaskPlanDataResponse)=>{
        const work: TaskPlanData= {
            department: taskPlan.department_name,
            checkin: taskPlan.checkin_time,
            checkout: taskPlan.checkout_time,
            shiftTime: taskPlan.shift_time,
            status: taskPlan.checkin_status
        };
        
        const date = moment(taskPlan.date, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD');
        
        if(result[date]){
            result[date].push(work);
        }else{
            result[date] = [];
            result[date].push(work);
        }
    })
    
    // Formating OtPlan
    otPlanResponse.forEach((otPlan: OtPlanDataResponse)=>{
        const work: OtPlanData= {
            department: otPlan.department_name,
            shiftTime: otPlan.shift_time,
            OTHour: otPlan.number_of_hour
        };
        
        const date =  moment(otPlan.date, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD');
        
        if(result[date]){
            result[date].push(work);
        }else{
            
            result[date] = [];
            result[date].push(work);
        }
    });
    return result;
}
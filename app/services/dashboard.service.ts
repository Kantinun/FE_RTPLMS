import moment from "moment";
import env from "../config/env";

export const get_departmentDetails = async (mngId: string) => {
        const res = await fetch(`${env.API_BASE}:${env.API_PORT}/dashboard/${mngId}`);
        const json = await res.json();
        return(dataHandler(json));
};

export const dataHandler = (data: any) => {
  let res: any = [];
  const len = data.department.length;
  for(let i=0; i < len ; i++){
    let newData = {
      department: {
        id: parseInt(data.department[i].department_id),
        title: String(data.department[i].name),
      },
      shift: data.shifts[i].map((shift)=>{
        return{
        shiftCode: String(shift.shiftCode),
        shiftDate: String(shift.shiftDate),
        shiftTime: String(shift.shiftTime),
        productivity: parseInt(shift.successProduct),
        entered: parseInt(shift.checkInMember),
        member: parseInt(shift.allMember),
        idealPerformance: parseInt(shift.idealPerformance),
      }})
      ,
      detailScreenName: 'Detail',

    }
    res.push(newData);
  }
  return res;
};

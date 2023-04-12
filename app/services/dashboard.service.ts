import env from "../config/env";

export const get_departmentDetails = async (mngId: string, limit: string, currentPage: number) => {
  
  if(currentPage < 0){
    currentPage = 1;
  }
  
  const res = await fetch(`${env.API_BASE}:${env.API_PORT}/dashboard/${mngId}?limit="${limit}"&currentPage=${currentPage}`);
  const json = await res.json();
  return(dataHandler(json));
};

export const dataHandler = (data: any) => {
  let res: any = [];
  const len = data.department.length;
  for(let i=0; i < len ; i++){
    let newData = {
      department: {
        id: data.department[i].department_id,
        title: String(data.department[i].name),
      },
      shift: data.shifts[i].map((shift)=>{
        return{
        shiftCode: String(shift.shiftCode),
        shiftDate: String(shift.shiftDate),
        shiftTime: String(shift.shiftTime),
        success_product_in_shiftTime: parseFloat(shift.success_product_in_shiftTime),
        success_product_in_OTTime: parseFloat(shift.success_product_in_OTTime),
        product_target: parseFloat(shift.product_target),
        entered: parseInt(shift.checkInMember),
        member: parseInt(shift.allMember),
        idealPerformance: parseInt(shift.idealPerformance),
        actualPerformance: parseFloat(shift.actual_performance)
      }})
      ,
      detailScreenName: 'Detail',

    }
    res.push(newData);
  }
  return res;
};

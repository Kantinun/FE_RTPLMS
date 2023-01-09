import env from "../config/env";

export const getCurrentShifts = async () => {
        const res = await fetch(`${env.API_BASE}:${env.API_PORT}/dashboard/1`);
        const json = await res.json();
        return(dataHandler(json));
};

export const dataHandler = (data: any) => {
  let res: any = [];
  const len = data.department.length;
  for(let i=0; i < len ; i++){
    let shift = data.shifts[i];
    let newData = {
      detailID: parseInt(data.department[i].department_id),
      title: String(data.department[i].name),
      shiftCode: String(shift.shiftCode),
      productivity: parseInt(shift.successProduct),
      entered: parseInt(shift.allMember),
      member: parseInt(shift.checkInMember),
      detailScreenName: 'Detail',
    }
    console.log(newData);
    res.push(newData);
  }
  return res;
};

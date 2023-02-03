export type departmentCardData = {
  department: {
    id: number,
    title: string,
  },
  shift: {
    shiftCode: string,
    shiftDate: string,
    shiftTime: string,
    productivity: number,
    entered: number,
    member: number,
  },
  detailScreenName: string,
};

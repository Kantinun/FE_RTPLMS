import moment from "moment";

export function filterCurrentShiftFrom(shifts) {
    const currentShift = shifts.filter((shift) => {
        let now = moment();
        let shift_time = moment(
          `${shift.shiftDate} ${shift.shiftTime}`,
          "YYYY/MM/DD HH:mm:ss"
        );
        return shift_time.isBefore(now) && shift_time.add(8, "hours").isAfter(now)
          ? shift
          : null;
        // Use pop() because fileter() will return Array but we need only the first object that match with condition then we use pop() to get it <3
      })[0];

    return currentShift;
}
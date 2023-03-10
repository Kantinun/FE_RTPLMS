import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BigText from "../../assets/Texts/BigText";
import { io } from "socket.io-client";
import env from "../config/env";
import { Appcontext } from "../../AppContext";
import { getShiftStatus } from "../services/detail.service";
const moment = require("moment");

function DetailCarousel(props: any) {
  const { state } = React.useContext(Appcontext);
  const [currentShift, setCurrentShift] = useState(props.currentShift);
  const [remainingTime, setRemainingTime] = useState(props.remainingTime);
  const width = Dimensions.get("window").width;
  async function handleUpdate(shiftCode: string, setCurrentShift: Function) {
    getShiftStatus(shiftCode).then((shift) => {
      if (!shift) {
        return;
      }
      const shiftFormated = {
        shiftCode: String(shift.shift_code),
        shiftDate: String(shift.shift_date),
        shiftTime: String(shift.shift_time),
        productivity: parseInt(shift.success_product),
        entered: parseInt(shift.checkin_member),
        member: parseInt(shift.all_member),
        idealPerformance: parseInt(shift.ideal_performance),
      };
      setCurrentShift(shiftFormated);
      console.log(shiftFormated);
      console.log("success product updated");
    });
  }
  useEffect(() => {
    // ===================
    // Web Socket
    // ===================
    const websocket = io(`${env.API_BASE}:${env.API_PORT}`);

    const updateSuccessProductTopic = `${state.data.id}-product`;
    const updateAttendanceTopic = `${state.data.id}-attendance`;

    websocket.on("connect", () => {
      console.log("connected");
    });

    // Update success product
    websocket.on(updateSuccessProductTopic, async (d: Object) => {
      await handleUpdate(currentShift.shiftCode, setCurrentShift);
    });

    // Update worker's attendace
    websocket.on(updateAttendanceTopic, async (d: Object) => {
      await handleUpdate(currentShift.shiftCode, setCurrentShift);
    });
    return () => {
      websocket.close();
    };
    // ===================
    // ===================
  }, []);

  // Update remaining time
  useEffect(() => {
    if (props.remainingTime !== remainingTime) {
        setRemainingTime(props.remainingTime);
    }
  }, [props.remainingTime]);

  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      autoPlayInterval={5000}
      mode="parallax"
      data={["page1", "page2"]}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {item === "page1" ? (
            <View style={styles.statusCard}>
              <BigText>?????????????????? : {currentShift.productivity}</BigText>
              <BigText>
                ???????????????????????????????????? :{" "}
                {remainingTime.seconds() > 0
                  ? remainingTime.asHours() <= 8
                    ? `${remainingTime.hours()} ??????. ${remainingTime.minutes()} ????????????`
                    : "???????????????????????????????????????"
                  : "????????????????????????"}
              </BigText>
              <BigText>
                ??????????????????????????? : {`${currentShift.idealPerformance} /??????.`}
              </BigText>
              <BigText>???????????????????????? : {currentShift.member}</BigText>
            </View>
          ) : (
            <View style={styles.statusCard}>
              <BigText>?????????????????? : {currentShift.shiftCode}</BigText>
              <BigText>
                ?????????????????? :{" "}
                {`${moment(currentShift.shiftTime, "HH:mm:ss").format(
                  "HH:mm"
                )}-${moment(currentShift.shiftTime, "HH:mm:ss")
                  .add(8, "hours")
                  .format("HH:mm")}`}
              </BigText>
              <BigText>
                ????????????????????? : {`${currentShift.entered}/${currentShift.member}`}
              </BigText>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  statusCard: {
    borderColor: "#aaaa",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
    alignSelf: "stretch",
  },
});

export default DetailCarousel;

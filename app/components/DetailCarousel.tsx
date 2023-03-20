import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BigText from "../../assets/Texts/BigText";
import { io } from "socket.io-client";
import env from "../config/env";
import { Appcontext } from "../../AppContext";
import { getShiftStatus, getShiftPrediction } from "../services/detail.service";
import { Badge } from "@rneui/themed";
const moment = require("moment");

function DetailCarousel(props: any) {
  const { state } = React.useContext(Appcontext);
  const [currentShift, setCurrentShift] = useState(props.currentShift);
  const [remainingTime, setRemainingTime] = useState(props.remainingTime);
  const [prediction_status, setPrediction_status] = useState('')
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
        success_product_in_shiftTime: parseFloat(shift.success_product_in_shiftTime),
        success_product_in_OTTime: parseFloat(shift.success_product_in_OTTime),
        product_target: parseFloat(shift.product_target),
        entered: parseInt(shift.checkin_member),
        member: parseInt(shift.all_member),
        idealPerformance: parseInt(shift.ideal_performance),
      };
      setCurrentShift(shiftFormated);
      console.log("success product updated");

      //Update prediction status
      getShiftPrediction(shiftCode).then((res) => {
        setPrediction_status(res.prediction);
      });

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

  useEffect(()=>{
    if (props.currentShift !== currentShift) {
     setCurrentShift(props.currentShift);
    }
    getShiftPrediction(props.currentShift.shiftCode).then((res) => {
      setPrediction_status(res.prediction);
    });
  },[props.currentShift])

  const handleShiftChange = async () => {
    if (props.currentShift !== currentShift) {
      await Promise.resolve(setCurrentShift(props.currentShift));
    }
    await getShiftPrediction(currentShift.shiftCode).then((res) => {
      setPrediction_status(res.prediction);
    });
  };
  const Prediction_badge = (props)=> (
        <Badge 
          value={props.status}
          status={props.status==="จบกะแล้ว"? "primary": props.status==="สำเร็จในเวลา"? "success":"error"}
          textStyle={{fontSize: 20}}
          badgeStyle={{flex:3}}
        />)

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
              <BigText>ผลผลิต : {currentShift.success_product_in_shiftTime+currentShift.success_product_in_OTTime}</BigText>
              <BigText>
                เวลาที่เหลือ :{" "}
                {remainingTime.seconds() > 0
                  ? remainingTime.asHours() <= 8
                    ? `${remainingTime.hours()} ชม. ${remainingTime.minutes()} นาที`
                    : "ยังไม่เริ่มกะ"
                  : "จบกะแล้ว"}
              </BigText>
              <BigText>
                กำลังผลิต : {`${currentShift.idealPerformance} /ชม.`}
              </BigText>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5}}>
                <BigText>คาดการณ์ : </BigText>
                <Prediction_badge status={prediction_status}/>
              </View>
            </View>
          ) : (
            <View style={styles.statusCard}>
              <BigText>รหัสกะ : {currentShift.shiftCode}</BigText>
              <BigText>
                เวลากะ :{" "}
                {`${moment(currentShift.shiftTime, "HH:mm:ss").format(
                  "HH:mm"
                )}-${moment(currentShift.shiftTime, "HH:mm:ss")
                  .add(8, "hours")
                  .format("HH:mm")}`}
              </BigText>
              <BigText>
                จำนวนคน : {`${currentShift.entered}/${currentShift.member}`}
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

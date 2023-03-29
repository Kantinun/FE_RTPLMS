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
        idealPerformance: parseFloat(shift.ideal_performance),
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
          status={props.status==="จบกะแล้ว"? "primary": props.status==="สำเร็จในเวลา"||props.status==="สำเร็จตามเป้าหมาย"? "success":"error"}
          textStyle={{fontSize: 20}}
          badgeStyle={{height: '100%', marginHorizontal: 5}}
        />)

  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={prediction_status!="จบกะแล้ว"}
      autoPlayInterval={5000}
      mode="parallax"
      data={prediction_status=="จบกะแล้ว"?["page1"]:["page1", "page2"]}
      scrollAnimationDuration={1000}
      withAnimation={{
        type: "spring",
        config: {
          damping: 13,
        },
      }}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {item === "page1" ? (
            <View style={styles.statusCard}>
              {prediction_status=="จบกะแล้ว"&&<BigText>รหัสกะ : {currentShift.shiftCode?currentShift.shiftCode:"-"}</BigText>}
              {prediction_status=="จบกะแล้ว"&&
              <BigText>
                เวลากะ :{" "}
                {currentShift.shiftTime?
                `${moment(currentShift.shiftTime, "HH:mm:ss").format(
                  "HH:mm"
                )}-${moment(currentShift.shiftTime, "HH:mm:ss")
                  .add(8, "hours")
                  .format("HH:mm")}`
                :
                `-`
                }
              </BigText>
              }
              <BigText>ผลผลิต : {currentShift.success_product_in_shiftTime?currentShift.success_product_in_shiftTime+currentShift.success_product_in_OTTime:0} / {currentShift.product_target?currentShift.product_target:0}</BigText>
              {prediction_status!="จบกะแล้ว"&&<BigText>
                เวลาที่เหลือ :{" "}
                {remainingTime.seconds() > 0
                  ? remainingTime.asHours() <= 8
                    ? `${remainingTime.hours()} ชม. ${remainingTime.minutes()} นาที`
                    : "ยังไม่เริ่มกะ"
                  : "--:--"}
              </BigText>}
              {prediction_status!="จบกะแล้ว"&&<BigText>
                กำลังผลิต : {`${currentShift.actualPerformance>0? currentShift.actualPerformance.toFixed(2): currentShift.idealPerformance} /ชม.`}
              </BigText>}
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5, height:'20%'}}>
                {prediction_status!="จบกะแล้ว"&&<BigText>คาดการณ์ : </BigText>}
                <Prediction_badge status={prediction_status}/>
                {prediction_status=="จบกะแล้ว"&&<Prediction_badge status={currentShift.success_product_in_shiftTime+currentShift.success_product_in_OTTime>=currentShift.product_target? "สำเร็จตามเป้าหมาย":"ไม่สำเร็จตามเป้าหมาย"}/>}
              </View>
            </View>
          ) : (
            <View style={styles.statusCard}>
              <BigText>รหัสกะ : {currentShift.shiftCode?currentShift.shiftCode:"-"}</BigText>
              <BigText>
                เวลากะ :{" "}
                {currentShift.shiftTime?
                `${moment(currentShift.shiftTime, "HH:mm:ss").format(
                  "HH:mm"
                )}-${moment(currentShift.shiftTime, "HH:mm:ss")
                  .add(8, "hours")
                  .format("HH:mm")}`
                :
                `-`
                }
              </BigText>
              {prediction_status!="จบกะแล้ว"&&<BigText>
                จำนวนคน : {currentShift.entered&&currentShift.member?`${currentShift.entered}/${currentShift.member}`:`-/-`}
              </BigText>}
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

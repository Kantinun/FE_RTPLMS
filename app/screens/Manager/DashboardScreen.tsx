import * as React from "react";
import { departmentCardData } from "../../../assets/typings";
import { FlatList, StyleSheet } from "react-native";
import DepartmentCard from "../../components/DepartmentCard";
import MainContainer from "../../components/MainContainer";
import { get_departmentDetails } from "../../services/dashboard.service";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { Appcontext } from "../../../AppContext";
import { io } from "socket.io-client";
import env from "../../config/env";
import { filterCurrentShiftFrom } from "../../lib/filterCurrentShift";

const DashboardScreen = ({ navigation }: any) => {
  const { state } = React.useContext(Appcontext);
  const [searchText, setSearchText] = useState("");
  const [fetch_data, setFetch_data] = useState<Array<departmentCardData>>([]);
  const [Data, setData] = React.useState(Array<departmentCardData>);

  const department_details = get_departmentDetails(state.data.id);

  React.useEffect(() => {
    department_details.then((res) => {
      res ? setFetch_data(res) : { department: [], shifts: [] };
      res ? setData(res) : { department: [], shifts: [] };
    });

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
      const new_deartment_detail = await get_departmentDetails(state.data.id);

      new_deartment_detail
        ? setFetch_data(new_deartment_detail)
        : { department: [], shifts: [] };
      new_deartment_detail
        ? setData(new_deartment_detail)
        : { department: [], shifts: [] };

      console.log("success product updated");
    });
    // Update worker's attendace
    websocket.on(updateAttendanceTopic, async (d: Object) => {
      const new_deartment_detail = await get_departmentDetails(state.data.id);

      new_deartment_detail
        ? setFetch_data(new_deartment_detail)
        : { department: [], shifts: [] };
      new_deartment_detail
        ? setData(new_deartment_detail)
        : { department: [], shifts: [] };

      console.log("attendance updated");
    });

    return () => {
      websocket.close();
    };
    // ===================
    // ===================
  }, []);

  const handle_search = (text: string) => {
    setSearchText(text);
    let new_data = fetch_data.filter((row_data) =>
      row_data.department.title.toLowerCase().includes(text.toLowerCase())
    );
    setData(new_data ? new_data : fetch_data);
  };

  const renderDepartmentCard = ({ item }: any) => {
    const current_shift = filterCurrentShiftFrom(item.shift);

    return (
      <DepartmentCard
        detailScreenName={item.detailScreenName}
        department={item.department}
        shift={item.shift}
        currentShift={current_shift}
        testID="DepartmentCard"
      />
    );
  };

  return (
    <MainContainer>
      <SearchBar
        placeholder="Search Here..."
        containerStyle={{ backgroundColor: "white", borderRadius: 15 }}
        inputContainerStyle={{ backgroundColor: "#eeee" }}
        round={true}
        lightTheme={true}
        value={searchText}
        onChangeText={(text) => {
          handle_search(text);
        }}
      ></SearchBar>
      <FlatList
        style={{ width: "100%" }}
        data={Data}
        renderItem={renderDepartmentCard}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "left",
    width: "100%",
  },
  card_list: {
    justifyContent: "center",
  },
});

export default DashboardScreen;

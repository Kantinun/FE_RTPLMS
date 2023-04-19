import * as React from "react";
import { departmentCardData } from "../../../assets/typings";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DepartmentCard from "../../components/DepartmentCard";
import MainContainer from "../../components/MainContainer";
import { get_departmentDetails } from "../../services/dashboard.service";
import { Icon, SearchBar } from "@rneui/themed";
import { useState } from "react";
import { Appcontext } from "../../../AppContext";
import { io } from "socket.io-client";
import env from "../../config/env";
import { filterCurrentShiftFrom } from "../../lib/filterCurrentShift";
import { TouchableOpacity } from "react-native-gesture-handler";
import BigText from "../../../assets/Texts/BigText";
import { colors } from "../../config/colors";
import { Dropdown } from "react-native-element-dropdown";
import { FloatingPaginateBtn } from "../../components/FloatingPaginateBtn";

const DashboardScreen = ({ navigation }: any) => {
  const { state } = React.useContext(Appcontext);
  const [searchText, setSearchText] = useState("");
  const [fetch_data, setFetch_data] = useState<Array<departmentCardData>>([]);
  const [isLoading, setIsLoading] = useState(true); // for indicate loding data state
  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [limit, setLimit] = useState('5'); // for pagination

  const [isFloatingBtnVisible, setIsFloatingBtnVisible] = useState(false); // for detect start scrolling flatlist
  const [isDisablePrevBtn, setIsDisablePrevBtn] = useState(false); // for disable prev button
  const [isDisableNextBtn, setIsDisableNextBtn] = useState(false); // for disable next button
  const [Data, setData] = React.useState(Array<departmentCardData>);

  // fetch department cards
  const fetchDepartmentCard = async (limit='5', currentPage=1) => {

    setIsLoading(true)
    const new_deartment_detail = await get_departmentDetails(state.data.id, limit, currentPage);
    
    new_deartment_detail
    ? setFetch_data(new_deartment_detail)
    : { department: [], shifts: [] };
    new_deartment_detail
    ? setData(new_deartment_detail)
    : { department: [], shifts: [] };

    setIsLoading(false)
  }

  React.useEffect(() => {
    fetchDepartmentCard(limit, currentPage)

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
      await fetchDepartmentCard(limit, currentPage);

      console.log("success product updated");
    });
    // Update worker's attendace
    websocket.on(updateAttendanceTopic, async (d: Object) => {
      await fetchDepartmentCard(limit, currentPage);

      console.log("attendance updated");
    });
    console.log("**************************************",fetch_data);
    return () => {
      websocket.close();
    };
    // ===================
    // ===================
  }, []);

  // handle change page or display limit
  React.useEffect(() => {
    if(currentPage == 1){
      setIsDisablePrevBtn(true);
    }else{
      setIsDisablePrevBtn(false);
    }
    // check if this is the last page
    Promise.resolve(get_departmentDetails(state.data.id, limit, currentPage + 1).then(async (res)=>{
      if(res.length == 0){
        setIsDisableNextBtn(true);
      }else{
        setIsDisableNextBtn(false);
      }
      await fetchDepartmentCard(limit, currentPage)
    }));    

    // hide floating BTNs
    setIsFloatingBtnVisible(false);
  }, [currentPage, limit]);

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

  const renderListHeader = () => {
      const data = [
        {label: '5', value: '5'},
        {label: '10', value: '10'},
        {label: '15', value: '15'},
        {label: '20', value: '20'},
        {label: '25', value: '25'},
        {label: '30', value: '30'},
        {label: '100', value: '100'},
        {label: '200', value: '200'},
        {label: 'ทั้งหมด', value: '*'},
      ]
      return (
        <View style={styles.listHeaderContainer}>
          <Dropdown 
            style={styles.dropdown} 
            labelField="label" 
            valueField="value"
            value={limit}
            placeholder={data[0].label}
            data={data}
            onChange={({value})=>{setLimit(value)}}
          />
          <FloatingPaginateBtn 
            style={styles.paginate}
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isDisableNextBtn={isDisableNextBtn}
            isDisablePrevBtn={isDisablePrevBtn}
          />
        </View>
      );
  }

  return (
    <>
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
      />
      <MainContainer style={styles.container}>
        {isLoading ?
          <BigText>Loading</BigText>
          :
          <FlatList
            style={styles.flatlist}
            data={Data}
            renderItem={renderDepartmentCard}
            ListHeaderComponent={renderListHeader}
            onScrollBeginDrag={(e)=>{}}
            onScroll={(event) => {
              const scrollOffset = event.nativeEvent.contentOffset.y
              if(scrollOffset >= 50){
                setIsFloatingBtnVisible(true)
              }else{
                setIsFloatingBtnVisible(false)
              }
            }}
          />
        }
      { (isFloatingBtnVisible && !(isDisablePrevBtn && isDisableNextBtn)) && 
        <FloatingPaginateBtn
          style={styles.floatingBtn}
          previousBtnOpacity={0.6}
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isDisableNextBtn={isDisableNextBtn}
          isDisablePrevBtn={isDisablePrevBtn}
        />
      }
      </MainContainer>
    </>
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
  flatlist: {
    width: "100%",
  },
  listHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,  
    marginBottom: 5,  
  },
  dropdown: {
    backgroundColor: colors.white,
    width: 100,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  paginate: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    
    width: "55%",
},
  floatingBtn: {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'flex-end',
  position: "absolute",
  bottom: 15,
  right: 30,
  zIndex: 999
},
});

export default DashboardScreen;

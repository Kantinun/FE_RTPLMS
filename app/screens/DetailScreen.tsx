import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, View} from 'react-native';

import DetailsDataTable from '../components/DetailsDataTable';
import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import BigText from '../../assets/Texts/BigText'
import MyDateTimePicker from '../components/DateTimePicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import { DataForPlanAndOt, getAccountInThisShift, getDataForPlanAndOt } from '../services/detail.service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../config/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Add_del_worker_modal from '../components/Modal/add_del_worker_modal';
import Add_del_ot_modal from '../components/Modal/add_del_ot_modal';
import {Button, SearchBar, Tab, TabView} from '@rneui/themed'
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {};

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  const [addWorkerVisible, setAddWorkerVisible] = useState(false);
  const [delWorkerVisible, setDelWorkerVisible] = useState(false);
  const [addOtVisible, setAddOtVisible] = useState(false);
  const [delOtVisible, setDelOtVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const updateSearch = (text: string) => {setSearchText(text)}
  const [date, setDate] = useState(new Date());
  const width = Dimensions.get('window').width;
  
  navigation.setOptions({title: route.params.title});
  
  const myData2 = {
    page1:{
      product: '10/100 kg',
      time_remain: '3 hr',
      performance: '5 kg/hr',
      prediction: 'สำเร็จตามเป้าหมาย',
    },
    page2:{
      shift_code: 'S01',
      shift_time: '9.00-18.00',
      number_of_worker: '10/13 คน'
    }
  }
  
  const [dataForPlanAndOt, setDataForPlanAndOt] = React.useState<DataForPlanAndOt>({plan: [], ot: []});
  const accountInThisShift: Promise<any> = getAccountInThisShift(route.params.shiftCode); // Call Api

  React.useEffect(() => {
    accountInThisShift.then((res) => {
      
      return getDataForPlanAndOt(res);
    }).then((data) => {
      
      setDataForPlanAndOt(data);
    })
  }, []);
  const [modalAddData, setModalAddData] = useState({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content:
    [
      {
        name: 'นาย ก',
        id: 1,
        performance: '5',
        isChecked: false
      },
      {
        name: 'นาย ข',
        id: 2,
        performance: '7',
        isChecked: false
      },
      {
        name: 'นาย ค',
        id: 3,
        performance: '6',
        isChecked: false
      },
      {
        name: 'นาย ง',
        id: 4,
        performance: '8',
        isChecked: false
      },
    ]
  })
  const [modalDelData, setModalDelData] = useState({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content:
    [
      {
        name: 'นาย A',
        id: 5,
        performance: '5',
        isChecked: false
      },
      {
        name: 'นาย B',
        id: 6,
        performance: '7',
        isChecked: false
      },
      {
        name: 'นาย C',
        id: 7,
        performance: '6',
        isChecked: false
      },
      {
        name: 'นาย D',
        id: 8,
        performance: '8',
        isChecked: false
      },
    ]
  })

  const [index, setIndex] = React.useState(0);
  
  return (
    <MainContainer>
      <RegularText>
        Department ID: {route.params.id}
      </RegularText>
      <View style={{marginVertical: 5, alignItems: 'center'}}>
        <MyDateTimePicker date={date} setDate={(date) => {setDate(date)}} />
      </View>
      <View style={{alignItems: 'center' }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                autoPlayInterval={5000}
                mode="parallax"
                data={Object.keys(myData2)}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                  <View style={{
                      flex:1,
                      alignItems: 'center',
                  }}>
                    {item === 'page1' ? (
                      <View style={styles.statusCard}>
                        <BigText>ผลผลิต : {myData2.page1.product}</BigText>
                        <BigText>เวลาที่เหลือ : {myData2.page1.time_remain}</BigText>
                        <BigText>กำลังผลิต : {myData2.page1.performance}</BigText>
                        <BigText>คาดการณ์ : {myData2.page1.prediction}</BigText>
                      </View>
                    ) : (
                      <View style={styles.statusCard}>
                        <BigText>รหัสกะ : {myData2.page2.shift_code}</BigText>
                        <BigText>เวลากะ : {myData2.page2.shift_time}</BigText>
                        <BigText>จำนวนคน : {myData2.page2.number_of_worker}</BigText>
                      </View>
                    )}
                  </View>
              )}
            />
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems:'center', backgroundColor: 'white', borderTopLeftRadius:20, borderTopRightRadius:20}}>
              <SearchBar
                placeholder='Search Here...'
                onChangeText={updateSearch}
                value={searchText}
                containerStyle={{backgroundColor: 'white', borderTopStartRadius: 20, borderTopWidth: 0, borderBottomWidth: 0, flex:2}}
                inputContainerStyle={{backgroundColor: '#eeee'}}
                round={true}
                lightTheme={true}
              ></SearchBar>
          <View style={styles.button_container}>
              <Button
                icon={{
                  name: index==0? 'account-multiple-plus':'clock-plus',
                  type: 'material-community',
                  size: 25,
                  color: 'white',
                }}
                raised={true}
                containerStyle={{borderRadius: 20}}
                buttonStyle={{backgroundColor:colors.green , borderColor: '#aaaa',borderRadius: 20}}
                onPress={()=>{index==0? setAddWorkerVisible(true): setAddOtVisible(true)}}
                
              ></Button>
              <Button
                icon={{
                  name: index==0? 'account-multiple-minus':'clock-minus',
                  type: 'material-community',
                  size: 25,
                  color: 'white',
                }}
                raised={true}
                containerStyle={{borderRadius: 20}}
                buttonStyle={{backgroundColor:colors.red, borderRadius: 20, borderColor: '#aaaa'}}
                onPress={()=>{index==0? setDelWorkerVisible(true): setDelOtVisible(true)}}
              ></Button>
          </View>
        </View> 
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: colors.primaryDark,
            height: 3,
          }}
          style={{backgroundColor: 'white'}}
        >
          <Tab.Item
            title="Work Plan"
            containerStyle={(active) => ({
              backgroundColor: active ? colors.primaryDark : 'white',
              borderWidth:1, borderColor: active? 'white':'#5555', borderRadius: 10, marginBottom: 5,

            })}
            titleStyle={(active) => ({ fontSize: 12, color: active ? 'white':colors.primaryDark})}
            icon={(active: any) => ({name: 'calendar-outline', type: 'ionicon', color: active? 'white': colors.primaryDark})}
          />
          <Tab.Item
            title="OT Plan"
            containerStyle={(active) => ({
              backgroundColor: active ? colors.primaryDark : 'white',
              borderWidth:1, borderColor: active? 'white':'#5555', borderRadius: 10, marginBottom: 5,

            })}
            titleStyle={(active) => ({ fontSize: 12, color: active ? 'white':colors.primaryDark})}
            icon={(active: any) => ({name: 'time-outline', type: 'ionicon', color: active? 'white': colors.primaryDark})}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <DetailsDataTable dataPlan={dataForPlanAndOt.plan} mode='work_plan'></DetailsDataTable>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <DetailsDataTable dataOt={dataForPlanAndOt.ot} mode='ot_plan'></DetailsDataTable>
          </TabView.Item>
        </TabView>
      
      <Add_del_ot_modal visible={addOtVisible} clickHandler={setAddOtVisible} mode='add'></Add_del_ot_modal>
      <Add_del_ot_modal visible={delOtVisible} clickHandler={setDelOtVisible} mode='delete'></Add_del_ot_modal>
      <Add_del_worker_modal visible={addWorkerVisible} clickHandler={setAddWorkerVisible} data={modalAddData}></Add_del_worker_modal>
      <Add_del_worker_modal visible={delWorkerVisible} clickHandler={setDelWorkerVisible} data={modalDelData}></Add_del_worker_modal>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    alignItems: 'flex-start',
    // padding: 16,
    paddingBottom: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'red'

  },
  tabIndicator: {
    backgroundColor: 'black'
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'red',
  },
  statusCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    // fontSize: 15,
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
    alignSelf: 'stretch'
  },
  button_container: {
    flex:1, 
    flexDirection:'row', 
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
  },
})
export default DetailScreen;

import React, {useEffect, useState} from 'react';
import { Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import DetailsDataTable from '../../components/DetailsDataTable';
import MainContainer from '../../components/MainContainer';
import BigText from '../../../assets/Texts/BigText'
import MyDateTimePicker from '../../components/DateTimePicker';
import Carousel from 'react-native-reanimated-carousel';
import { addWorker, DataForPlanAndOt, delWorker, DetailResponse, getAccountInThisShift, getDataForPlanAndOt, getFreeWorkers, ModalAddData } from '../../services/detail.service';
import { colors } from '../../config/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Add_del_worker_modal from '../../components/Modal/add_del_worker_modal';
import Add_del_ot_modal from '../../components/Modal/add_del_ot_modal';
import {Button, SearchBar, Tab, TabView, Icon} from '@rneui/themed'
import { Dropdown } from 'react-native-element-dropdown';


type Props = {};

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  const [addWorkerVisible, setAddWorkerVisible] = useState(false);
  const [delWorkerVisible, setDelWorkerVisible] = useState(false);
  const [addOtVisible, setAddOtVisible] = useState(false);
  const [delOtVisible, setDelOtVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const updateSearch = (text: string) => {setSearchText(text)}
  const [date, setDate] = useState<Date>();
  const width = Dimensions.get('window').width;
  
  navigation.setOptions({title: route.params.department.title});
  
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
  const accountInThisShift: Promise<any> = getAccountInThisShift(route.params.shift.shiftCode); // Call Api

  React.useEffect(() => {
    accountInThisShift.then((res) => {
      
      return getDataForPlanAndOt(res);
    }).then((data) => {
      
      setDataForPlanAndOt(data);
      setDate(new Date(route.params.shift.shiftDate))
    })
  }, []);
  const [modalAddData, setModalAddData] = useState<{header:string[], content:ModalAddData[]}>({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content: []
    // content:
    // [
    //   {
    //     name: 'นาย ก',
    //     id: 1,
    //     performance: '5',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย ข',
    //     id: 2,
    //     performance: '7',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย ค',
    //     id: 3,
    //     performance: '6',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย ง',
    //     id: 4,
    //     performance: '8',
    //     isChecked: false
    //   },
    // ]
  })
  const [modalDelData, setModalDelData] = useState<{header:string[], content:ModalAddData[]}>({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content: []
    // [
    //   {
    //     name: 'นาย A',
    //     id: 5,
    //     performance: '5',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย B',
    //     id: 6,
    //     performance: '7',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย C',
    //     id: 7,
    //     performance: '6',
    //     isChecked: false
    //   },
    //   {
    //     name: 'นาย D',
    //     id: 8,
    //     performance: '8',
    //     isChecked: false
    //   },
    // ]
  })
  const shifts = [
    { label: '09.00-17.00', value: 'S1' },
    { label: '17.00-01.00', value: 'S2' },
    { label: '01.00-09.00', value: 'S3' },]
  const [shiftSelected, setShiftSelected] = useState('')

  const [index, setIndex] = React.useState(0);

  const openAddModal = async () => {
    // Use manager id instead 1
    const tmp = {...modalAddData};
    tmp.content = await getFreeWorkers('1',route.params.shift.shiftCode,route.params.shift.shiftDate);

    setModalAddData(tmp);
    setAddWorkerVisible(true);
  }
  
  const openDelModal = async () => {
    // Use manager id instead 1
    const tmp = {...modalDelData};
    tmp.content = dataForPlanAndOt.plan.map((account)=>{
      return {...account, isChecked: false}
    });

    setModalDelData(tmp);
    setDelWorkerVisible(true);
  }
  
  const handleConfirm = (mode: string) => {
    const selected = mode === 'add' ? 
      modalAddData.content.filter((obj)=> obj.isChecked):
      modalDelData.content.filter((obj)=> obj.isChecked)

    const data = {
      shiftCode: route.params.shift.shiftCode,
      date: route.params.shift.shiftDate,
      accountIds:  selected.map((obj)=>obj.id)
    }

    if(mode === 'add'){
      
      addWorker(data)
      .then((res)=>{
        const tmp = {...dataForPlanAndOt};
        selected.forEach((account)=> {
        tmp.plan.push({
          id: account.id,
          name: account.name,
          checkInOut: "-",
          checkInStatus: 'ยังไม่เข้างาน',
          performance: account.performance,
        })
      });  
      setDataForPlanAndOt(tmp);
      })
      .catch((e)=>{
        console.log(e);
      });

    }else{
      delWorker(data)
      .then((res)=>{
        const tmp = {...dataForPlanAndOt};
        data.accountIds.forEach((id)=>{
        const index = tmp.plan.findIndex((obj)=>(obj.id === id));
        tmp.plan.splice(index,1)
      })
      setDataForPlanAndOt(tmp);
      })
      .catch((e)=>{
        console.log(e);
      });
    }

  }
  return (
    <MainContainer>
      <View style={{marginVertical: 5, alignItems: 'center', flexDirection: 'row',justifyContent: 'center'}}>
        <MyDateTimePicker date={date} setDate={setDate} />
        <Dropdown
          style={[styles.dropdown,styles.raise]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={shifts}
          search={false}
          maxHeight={300}
          activeColor={colors.primaryLight}
          labelField="label"
          valueField="value"
          // placeholder="เลือกกะ"
          placeholder={route.params.shift.shiftTime}
          value={shiftSelected}
          dropdownPosition='bottom'
          onChange={item => {
            setShiftSelected(item.value);
          }}
          renderLeftIcon={() => (
            <Icon
              name='time'
              type='ionicon'
              style={styles.iconStyle}
              color={colors.primaryDark}
            />
          )}
        />
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
                        <BigText>รหัสกะ : {route.params.shift.shiftCode}</BigText>
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
                icon={<Icon name={index==0? 'account-multiple-plus':'clock-plus'} type='material-community' size={25} color='white'></Icon>}
                raised={true}
                containerStyle={{borderRadius: 20}}
                buttonStyle={{backgroundColor:colors.green , borderColor: '#aaaa',borderRadius: 20}}
                onPress={()=>{index==0? openAddModal(): setAddOtVisible(true)}}
                
              ></Button>
              <Button
                icon={<Icon name={index==0? 'account-multiple-minus':'clock-minus'} type='material-community' size={25} color='white'></Icon>}
                raised={true}
                containerStyle={{borderRadius: 20}}
                buttonStyle={{backgroundColor:colors.red, borderRadius: 20, borderColor: '#aaaa'}}
                onPress={()=>{index==0? openDelModal(): setDelOtVisible(true)}}
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
            icon={<Icon name='calendar-outline' type='ionicon' color={index==0? 'white': colors.primaryDark}></Icon>}
            iconPosition='left'
          />
          <Tab.Item
            title="OT Plan"
            containerStyle={(active) => ({
              backgroundColor: active ? colors.primaryDark : 'white',
              borderWidth:1, borderColor: active? 'white':'#5555', borderRadius: 10, marginBottom: 5,

            })}
            titleStyle={(active) => ({ fontSize: 12, color: active ? 'white':colors.primaryDark})}
            icon={<Icon name='time-outline' type='ionicon' color={index==1? 'white': colors.primaryDark}></Icon>}
            iconPosition='left'
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
      <Add_del_worker_modal 
        visible={addWorkerVisible} 
        clickHandler={setAddWorkerVisible} 
        data={modalAddData} 
        confirmHandler={setModalAddData}
        handleConfirm={handleConfirm}
        mode='add'
      />
      <Add_del_worker_modal 
        visible={delWorkerVisible} 
        clickHandler={setDelWorkerVisible} 
        data={modalDelData} 
        confirmHandler={setModalDelData}
        handleConfirm={handleConfirm}
        mode='delete'
      />

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
    borderColor: '#aaaa',
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
  dropdown: {
    marginHorizontal: 10,
    height: '100%',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: '#aaaa',
    width: '40%',
  },
  raise:{
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaa'
  },
  selectedTextStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.primaryDark
  },
  iconStyle: {
    marginLeft: 10,
  },
})
export default DetailScreen;

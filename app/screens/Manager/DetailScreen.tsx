import React, {useEffect, useState} from 'react';
import { Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import DetailsDataTable from '../../components/DetailsDataTable';
import MainContainer from '../../components/MainContainer';
import BigText from '../../../assets/Texts/BigText'
import MyDateTimePicker from '../../components/DateTimePicker';
import Carousel from 'react-native-reanimated-carousel';
import { addWorker, DataForPlanAndOt, delWorker, DetailResponse, getAccountInThisShift, getDataForPlanAndOt, getFreeWorkers, getShift_li, ModalAddData } from '../../services/detail.service';
import { deleteRequest, createRequest } from '../../services/otRequest.service';
import { colors } from '../../config/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Add_del_worker_modal from '../../components/Modal/add_del_worker_modal';
import Add_del_ot_modal from '../../components/Modal/add_del_ot_modal';
import {Button, SearchBar, Tab, TabView, Icon} from '@rneui/themed'
import { Dropdown } from 'react-native-element-dropdown';
import { Appcontext } from '../../../AppContext';
import moment from 'moment';


type Props = {};
interface OTConfirmProps {
  mode: string;
  method: string;
  unit?: string;
  quantity?: number;
  accountIds: string[];
}

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {

  const {state} = React.useContext(Appcontext);
  
  const navigation = useNavigation<NavigationProp<any>>();
  const [addWorkerVisible, setAddWorkerVisible] = useState(false);
  const [delWorkerVisible, setDelWorkerVisible] = useState(false);
  const [addOtVisible, setAddOtVisible] = useState(false);
  const [delOtVisible, setDelOtVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [date, setDate] = useState<Date>(new Date(route.params.shift.shiftDate));
  const width = Dimensions.get('window').width;
  
  navigation.setOptions({title: route.params.department.title});
  
  const get_shift_li: Promise<any> = getShift_li(route.params.department.id, moment(date).format('YYYY-MM-DD'))
  const [shift_time_li,setShift_time_li] = useState([])
  const [shift_li, setShift_li] = useState([])
  const [currentShift, setCurrentShift] = useState(route.params.shift)

  const [fetchData, setFetchData] = React.useState<DataForPlanAndOt>({plan: [], ot: []});
  const [dataForPlanAndOt, setDataForPlanAndOt] = React.useState<DataForPlanAndOt>({plan: [], ot: []});
  const [OTData, setOTData] = useState([])
  const accountInThisShift: Promise<any> = getAccountInThisShift(currentShift.shiftCode); // Call Api

  const [endTime, setEndTime] = useState(moment(currentShift.shiftTime,'HH:mm:ss').add(8,'hours')); // set shift end time
  const [remainingTime, setRemainingTime] = useState(moment.duration(endTime.diff(moment()))); // calculate remaining time

  const updateSearch = (text: string) => {
    setSearchText(text)
    setDataForPlanAndOt({plan: index==0?fetchData.plan.filter((data)=> data.name.toLowerCase().includes(text.toLowerCase())):fetchData.plan, 
                      ot:index==1?fetchData.ot.filter((data)=> data.name.toLowerCase().includes(text.toLowerCase())):fetchData.ot})
  }
  
  React.useEffect(() => {
    accountInThisShift.then((res) => {
      return getDataForPlanAndOt(res);
    }).then((data) => {
      setFetchData(data)
      setDataForPlanAndOt(data);
      setOTData(data.ot)
    })
    get_shift_li.then((res)=> {
        setShift_li(res)
        //res is 2 dimention array then we use pop() to redimention to 1
        let tmp_li = []
        res.map((ele) => {
          tmp_li.push({
            label: `${moment(ele.shiftTime, 'HH:mm:ss').format('HH:mm')}-${moment(ele.shiftTime,'HH:mm:ss').add(8,'hours').format("HH:mm")}`,
            value: ele.shiftCode,
          })
        })
        setShift_time_li(tmp_li? tmp_li: [])
    } )
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = moment.duration(endTime.diff(moment()));
      if (newRemainingTime.asSeconds() <= 0) {
        setRemainingTime(newRemainingTime);
        clearInterval(interval);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [endTime]);

  useEffect(()=>{
    get_shift_li.then((res)=> {
      setShift_li(res)
      //res is 2 dimention array then we use pop() to redimention to 1
      let tmp_li = []
      res.map((ele) => {
        tmp_li.push({
          label: `${moment(ele.shiftTime, 'HH:mm:ss').format('HH:mm')}-${moment(ele.shiftTime,'HH:mm:ss').add(8,'hours').format("HH:mm")}`,
          value: ele.shiftCode,
        })
      })
      setShift_time_li(tmp_li? tmp_li: [])
      setFetchData({plan: [], ot: []})
      setDataForPlanAndOt({plan: [], ot: []})
      if(tmp_li.length==0){
        setCurrentShift({})
      }
  } )
  },[date])

  const [modalAddData, setModalAddData] = useState<{header:string[], content:ModalAddData[]}>({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content: []
  })
  const [modalDelData, setModalDelData] = useState<{header:string[], content:ModalAddData[]}>({
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content: []
  })

  const [index, setIndex] = React.useState(0);

  const openAddWorkerModal = async () => {
    // Use manager id instead 1
      const tmp = {...modalAddData};
      tmp.content = await getFreeWorkers(state.data.id,currentShift.shiftCode,currentShift.shiftDate);
      tmp.content.map((ele)=>{
        ele = {...ele, isChecked: false}
      })
      setModalAddData(tmp);
      setAddWorkerVisible(true);
  }

  const openAddOTModal= ()=>{
    const tmp = dataForPlanAndOt.plan.filter((task)=> !dataForPlanAndOt.ot.map(req=>req.account_id).includes(task.account_id))
      tmp.map((req)=>{
        req = {...req, isCheck: false}
      })
      setOTData(tmp)
      setAddOtVisible(true)
  }
  
  const openDelWorkerModal = async () => {
    // Use manager id instead 1
      const tmp = {...modalDelData};
      tmp.content = dataForPlanAndOt.plan.map((account)=>{
        return {...account, isChecked: false}
      });
      setModalDelData(tmp);
      setDelWorkerVisible(true);
  }
  const openDelOTModal = ()=>{
    const tmp = dataForPlanAndOt.ot.reduce((request_list, req)=> {
        request_list.push({
          account_id: req.account_id,
          name: req.name, 
          performance: req.performance,
          hour: req.otDuration? req.otDuration:null,
          isCheck: false
        })
        return request_list
      },[])
      setOTData(tmp)
      setDelOtVisible(true)
  }
  
  const handleWorkerModalConfirm = (mode: string) => {
    const selected = mode === 'add' ? 
      modalAddData.content.filter((obj)=> obj.isChecked):
      modalDelData.content.filter((obj)=> obj.isChecked)

    const data = {
      shiftCode: currentShift.shiftCode,
      date: currentShift.shiftDate,
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

  const handleOTConfirm = (OTProps: OTConfirmProps) => {
      if(OTProps.mode=='add'){
        createRequest({
          shiftCode: currentShift.shiftCode,
          date: currentShift.shiftDate,
          method: OTProps.method,
          mngId: state.data.id,
          unit: OTProps.unit,
          quantity: OTProps.quantity,
          accountIds: OTProps.accountIds
        }).then(()=>{
          getAccountInThisShift(currentShift.shiftCode).then((res) => {
            return getDataForPlanAndOt(res);
          }).then((data) => {
            console.log(data)

            setFetchData(data)
            setDataForPlanAndOt(data)
          })
        })
        setAddOtVisible(false)
      }else{
        deleteRequest(state.data.id,currentShift.shiftCode,OTProps.accountIds).then((res)=>{
          const tmp = {...dataForPlanAndOt}
          OTProps.accountIds.forEach((id)=>{
            const index = tmp.ot.findIndex((obj)=>obj.account_id===id)
            tmp.ot.splice(index,1)
          })
          setFetchData(tmp)
          setDataForPlanAndOt(tmp)
        })
        .catch((e)=>{console.log(e)})
        setDelOtVisible(false)
      }
  }

  return (
    <MainContainer>
      <View style={{marginVertical: 5, alignItems: 'center', flexDirection: 'row',justifyContent: 'center'}}>
        <MyDateTimePicker date={date} setDate={setDate} />
        <Dropdown
          style={[styles.dropdown,styles.raise]}
          placeholder="Select shift"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={shift_time_li}
          search={false}
          maxHeight={300}
          activeColor={colors.primaryLight}
          labelField="label"
          valueField="value"
          value={currentShift.shiftCode}
          dropdownPosition='bottom'
          onChange={async(item) => {
              let newShift = await shift_li.filter((shift)=> shift.shiftCode == item.value)[0]
              setCurrentShift(await newShift)
              getAccountInThisShift(newShift.shiftCode).then((res) => {
                return getDataForPlanAndOt(res);
              }).then((data) => {
                setFetchData(data)
                setDataForPlanAndOt(data);
              })
              setEndTime(moment(newShift.shiftTime,'HH:mm:ss').add(8,'hours'))
              setRemainingTime(moment.duration(moment(newShift.shiftTime,'HH:mm:ss').add(8,'hours').diff(moment())))
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
                data={['page1','page2']}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                  <View style={{
                      flex:1,
                      alignItems: 'center',
                  }}>
                    {item === 'page1' ? (
                      <View style={styles.statusCard}>
                        <BigText>ผลผลิต : {currentShift.productivity}</BigText>
                        <BigText>เวลาที่เหลือ : {remainingTime.seconds()>0? remainingTime.asHours()<=8?`${remainingTime.hours()} ชม. ${remainingTime.minutes()} นาที`:'ยังไม่เริ่มกะ':'จบกะแล้ว'}</BigText>
                        <BigText>กำลังผลิต : {`${currentShift.idealPerformance} /ชม.`}</BigText>
                        <BigText>คาดการณ์ : {currentShift.member}</BigText>
                      </View>
                    ) : (
                      <View style={styles.statusCard}>
                        <BigText>รหัสกะ : {currentShift.shiftCode}</BigText>
                        <BigText>เวลากะ : {`${moment(currentShift.shiftTime, 'HH:mm:ss').format('HH:mm')}-${moment(currentShift.shiftTime,'HH:mm:ss').add(8,'hours').format("HH:mm")}`}</BigText>
                        <BigText>จำนวนคน : {`${currentShift.entered}/${currentShift.member}`}</BigText>
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
                onPress={()=>{index==0? openAddWorkerModal(): openAddOTModal()}}
                
              ></Button>
              <Button
                icon={<Icon name={index==0? 'account-multiple-minus':'clock-minus'} type='material-community' size={25} color='white'></Icon>}
                raised={true}
                containerStyle={{borderRadius: 20}}
                buttonStyle={{backgroundColor:colors.red, borderRadius: 20, borderColor: '#aaaa'}}
                onPress={()=>{
                  index==0?openDelWorkerModal():openDelOTModal()
                }}
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
          <TabView.Item style={{ width: '100%' }}>
          <DetailsDataTable dataPlan={dataForPlanAndOt.plan} mode='work_plan'></DetailsDataTable>
          </TabView.Item>
          <TabView.Item style={{  width: '100%' }}>
          <DetailsDataTable dataOt={dataForPlanAndOt.ot} mode='ot_plan'></DetailsDataTable>
          </TabView.Item>
        </TabView>
      
      <Add_del_ot_modal 
        visible={addOtVisible} 
        clickHandler={setAddOtVisible} 
        mode='add'
        data={OTData}
        handleConfirm={handleOTConfirm}
      />
      <Add_del_ot_modal 
        visible={delOtVisible} 
        clickHandler={setDelOtVisible} 
        mode='delete'
        data={OTData}
        handleConfirm={handleOTConfirm}
      />
      <Add_del_worker_modal 
        visible={addWorkerVisible} 
        clickHandler={setAddWorkerVisible} 
        data={modalAddData} 
        confirmHandler={setModalAddData}
        handleConfirm={handleWorkerModalConfirm}
        mode='add'

      />
      <Add_del_worker_modal 
        visible={delWorkerVisible} 
        clickHandler={setDelWorkerVisible} 
        data={modalDelData} 
        confirmHandler={setModalDelData}
        handleConfirm={handleWorkerModalConfirm}
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
    paddingBottom: 10,
    paddingHorizontal: 10,

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

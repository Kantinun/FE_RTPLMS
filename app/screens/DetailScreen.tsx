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
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../config/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import MyModal from '../components/MyModal';
import {SearchBar, Tab, TabView} from '@rneui/themed'

type Props = {};

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  const [addWorkerVisible, setAddWorkerVisible] = useState(false);
  const [delWorkerVisible, setDelWorkerVisible] = useState(false);
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
      <MyModal visible={addWorkerVisible} clickHandler={setAddWorkerVisible} data={modalAddData}></MyModal>
      <MyModal visible={delWorkerVisible} clickHandler={setDelWorkerVisible} data={modalDelData}></MyModal>
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
        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>
          {/* <View style={[styles.container,{flex:2}]}> */}
              <SearchBar
                placeholder='Search Here...'
                onChangeText={updateSearch}
                value={searchText}
                containerStyle={{flex:2, backgroundColor: 'white'}}
                inputContainerStyle={{backgroundColor: 'white', borderWidth: 1}}
                round={true}
                showCancel={true}
                lightTheme={true}
              ></SearchBar>
          {/* </View> */}
          <View style={styles.button_container}>
              <View style={styles.button}>
                  <Icon.Button
                      name="pluscircleo"
                      style={styles.Icon}
                      iconStyle={{marginRight: 0}}
                      backgroundColor={colors.primary} 
                      onPress={()=>{setAddWorkerVisible(true)}}                          
                      />
              </View>
              <View style={styles.button}>
                <Icon.Button
                        name="minuscircleo"
                        style={styles.Icon}
                        iconStyle={{marginRight: 0}}
                        backgroundColor='#F5222D'
                        onPress={()=>{setDelWorkerVisible(true)}}
                    />
              </View>
          </View>
        </View> 
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: colors.primary,
            height: 3,
          }}
          containerStyle={{backgroundColor:'white'}}
          // variant="white"
        >
          <Tab.Item
            title="Work Plan"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'calendar-outline', type: 'ionicon', color: 'grey' }}
          />
          <Tab.Item
            title="OT Plan"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'time-outline', type: 'ionicon', color: 'grey' }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{  width: '100%' }}>
          <DetailsDataTable mode='work_plan'></DetailsDataTable>
          </TabView.Item>
          <TabView.Item style={{  width: '100%' }}>
          <DetailsDataTable mode='ot_plan'></DetailsDataTable>
          </TabView.Item>
        </TabView>
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
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  button: {
      flex: 1,
      marginHorizontal: 5
  },
  Icon: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginRight: 0,
  },
})
export default DetailScreen;

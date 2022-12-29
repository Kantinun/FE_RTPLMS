import React, {useEffect, useState} from 'react';
import {Modal, Dimensions, StyleSheet, Text, View, Image, Animated, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';

import DetailsDataTable from '../components/DetailsDataTable';
import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import BigText from '../../assets/Texts/BigText'
import MyDateTimePicker from '../components/DateTimePicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../config/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import MyModal from '../components/MyModal';

type Route = {
  key: string;
  title: string;
};

type Props = {};

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const width = Dimensions.get('window').width;
  
  navigation.setOptions({title: route.params.title});
  
  // const myData = [{uri: 'https://picsum.photos/200'},{uri: 'https://picsum.photos/200/300'},{uri: 'https://picsum.photos/seed/picsum/200/300'}]
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
  const page1 = Object.keys(myData2.page1).map(key => myData2.page1[key])
  const page2 = Object.keys(myData2.page2).map(key => myData2.page2[key])
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'Work Plan' },
    { key: 'second', title: 'OT Plan' },
  ]);

  const FirstRoute = () => (
    <DetailsDataTable mode='work_plan'></DetailsDataTable>
  );
  
  const SecondRoute = () => (
    <DetailsDataTable mode='ot_plan'></DetailsDataTable>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(props.navigationState.routes.indexOf(route))}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  return (
    <MainContainer>
      <MyModal visible={modalVisible} clickHandler={setModalVisible}></MyModal>
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
        <View style={{flexDirection: 'row',justifyContent: 'center'}}>
          <View style={[styles.container,{flex:2}]}>
              <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search here.."
                  style={{flex:1, borderWidth:1,textAlign:'center', borderColor:'#bbbb', backgroundColor:'white'}}
              />
              <Icon.Button
                  name='search1'
                  iconStyle={{ marginRight: 0}}
              ></Icon.Button>
          </View>
          <View style={styles.button_container}>
              <View style={styles.button}>
                  <Icon.Button
                      name="pluscircleo"
                      style={styles.Icon}
                      iconStyle={{marginRight: 0}}
                      backgroundColor={colors.primary} 
                      onPress={()=>{setModalVisible(true)}}                          
                      />
              </View>
              <View style={styles.button}>
              <Icon.Button
                      name="minuscircleo"
                      style={styles.Icon}
                      iconStyle={{marginRight: 0}}
                      backgroundColor='#F5222D'
                      onPress={()=>{setModalVisible(true)}}
                  />
              </View>
                </View>
          </View> 
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
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

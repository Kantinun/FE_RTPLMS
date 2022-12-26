import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, Image, Animated, TouchableOpacity} from 'react-native';

import DetailsDataTable from '../components/DetailsDataTable';
import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import BigText from '../../assets/Texts/BigText'
import MyDateTimePicker from '../components/DateTimePicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import { TabView, SceneMap } from 'react-native-tab-view';


type Route = {
  key: string;
  title: string;
};

type Props = {};

const DetailScreen:React.FunctionComponent<Props> = ({route}: any) => {
  const [date, setDate] = useState(new Date());
  const width = Dimensions.get('window').width;
  const myData = [{uri: 'https://picsum.photos/200'},{uri: 'https://picsum.photos/200/300'},{uri: 'https://picsum.photos/seed/picsum/200/300'}]
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
                autoPlayInterval={1500}
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
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}r
          renderTabBar={renderTabBar}
        />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    alignItems: 'flex-start',
    padding: 16,
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
  }
})
export default DetailScreen;

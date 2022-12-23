import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, Image, Animated, TouchableOpacity} from 'react-native';

import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
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

  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

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
      <View style={{marginVertical: 10, alignItems: 'center'}}>
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
                data={myData}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                  <View style={{
                      flex:1,
                      alignItems: 'center',
                  }}>
                  <Image
                      source={{
                          uri: item.uri,
                          width: '90%',
                          height: '100%'
                      }}
                  ></Image>
                  </View>
              )}
            />
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
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text>First Route</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text>Second Route</Text>
  </View>
);

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
})
export default DetailScreen;

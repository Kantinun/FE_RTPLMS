import React, {useState} from 'react';
import {Dimensions,Button, StyleSheet, Text, View, Image} from 'react-native';

import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import MyDateTimePicker from '../components/DateTimePicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';


const DetailScreen = ({route}: any) => {
  const [date, setDate] = useState(new Date());
  const width = Dimensions.get('window').width;
  const myData = [{uri: 'https://picsum.photos/200'},{uri: 'https://picsum.photos/200/300'},{uri: 'https://picsum.photos/seed/picsum/200/300'}]


  return (
    <MainContainer>
      <RegularText>
        Department ID: {route.params.id}
      </RegularText>
      <View style={{marginVertical: 10}}>
        <MyDateTimePicker date={date} setDate={(date) => {setDate(date)}} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                autoPlayInterval={1500}
                mode="parallax"
                data={myData}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  header: {

  },
})
export default DetailScreen;

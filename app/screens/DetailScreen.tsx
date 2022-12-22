import React, {useState} from 'react';
import {Dimensions,Button, StyleSheet, Text, View} from 'react-native';

import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import MyDateTimePicker from '../components/DateTimePicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';


const DetailScreen = ({route}: any) => {
  const [date, setDate] = useState(new Date());
  const width = Dimensions.get('window').width;

  return (
    <MainContainer>
      <RegularText>
        Department ID: {route.params.id}
      </RegularText>
      <View>
        <MyDateTimePicker date={date} setDate={(date) => {setDate(date)}} />
      </View>
      <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
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

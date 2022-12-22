import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import MainContainer from '../components/MainContainer';
import RegularText from '../../assets/Texts/RegularText';
import MyDateTimePicker from '../components/DateTimePicker';
// import DatePicker from 'react-native-datepicker';
import DatePicker from '@react-native-community/datetimepicker'
// import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';

const DetailScreen = ({route}: any) => {
  const [date, setDate] = useState(new Date());

  return (
    <MainContainer>
      <RegularText>
        Department ID: {route.params.id}
      </RegularText>
      <View>
        <MyDateTimePicker date={date} setDate={(date) => {setDate(date)}} />
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

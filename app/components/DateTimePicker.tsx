import React, { useState } from 'react';
import { Text, View, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';

const MyDateTimePicker = (props: any) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || props.date;
    setShow(false);
    props.setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      {(Platform.OS === 'android') && (
      <TouchableOpacity onPress={showDatepicker}>
        <Moment element={Text} format="DD/MM/YYYY">{props.date.toDateString()}</Moment>
      </TouchableOpacity>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {(Platform.OS === 'ios') && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          on
        />
      )} 
    </View>
  );
};


export default MyDateTimePicker;
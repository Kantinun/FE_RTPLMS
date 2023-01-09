import React, { useState } from 'react';
import { Text, View, Button, Platform, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
        <View style={styles.momentContainer}>
          <Image style={[styles.calendarIcon,{alignSelf: 'flex-end'}]}
            source={require('../../assets/calendar.png')
          }></Image>
          <Moment element={Text} format="DD/MM/YYYY">{props.date.toDateString()}</Moment>
        </View>
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
          // style={{backgroundColor: 'black'}}
        />
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  momentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    
  },
  calendarIcon: {
    marginHorizontal: 10,
    width: 20,
    height: 20
  }
})

export default MyDateTimePicker;
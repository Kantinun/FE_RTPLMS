import React, { useState } from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { colors } from '../config/colors';

const MyDateTimePicker = (props: any) => {
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  return (
    <View>
      <Button
      title={selectedDate? moment(selectedDate).format("DD/MM/YYYY"): 'Please select date'}
      onPress={()=>{
        setVisible(true)
      }}
      containerStyle={{borderRadius:15}}
      raised={true}
      titleStyle={{color: colors.primaryDark}}
      buttonStyle={{backgroundColor: 'white', borderWidth: 1, borderColor: '#aaaa', borderRadius: 15}}
      icon={{
        name: 'calendar',
        type: 'ionicon',
        size: 25,
        color: colors.primaryDark,
      }}
      
    ></Button>
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      onConfirm={(date)=>{
        setSelectedDate(date)
        setVisible(false)
      }}
      onCancel={()=>{setVisible(false)}}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  btn:{
    backgroundColor: 'white',
    borderWidth: 1, 
    borderColor: '#aaaa', 
    borderRadius: 15
  }
})

export default MyDateTimePicker;
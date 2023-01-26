import React, { useState } from 'react';
import { View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import { colors } from '../../config/colors';

function TaskPlanScreen(props: unknown) {
    const [date,setDate]=useState(moment().format('YYYY-MM-DD'))
    return (
        <View style={{flex:1, backgroundColor: 'green'}}>        
            <Agenda
            items={{
                '2023-01-26': [{name: 'item 1 - any js object', height: 80}, {name: 'any js object', height: 80}, {name: 'any js object', height: 80}],
                '2023-01-27': [{name: 'item 2 - any js object', height: 80}],
                '2023-01-28': [],
                '2023-01-29': [{name: 'item 3 - any js object', height: 80}, {name: 'any js object', height: 80}],
                '2023-01-30': [{name: 'item 3 - any js object', height: 80}, {name: 'any js object', height: 80}],
                '2023-01-31': [{name: 'item 3 - any js object', height: 80}, {name: 'any js object', height: 80}],
                '2023-02-01': [{name: 'item 3 - any js object', height: 80}, {name: 'any js object', height: 80}],
            }}
            // selected={'2023-01-27'}
            onDayPress={day => {
                console.log('selected day', day);
              }}
            // renderKnob={()=>(<View style={{backgroundColor: colors.primaryLight, width: 75, height:10, borderRadius:40, opacity: 0.3, marginTop: 5}}></View>)}
            pastScrollRange={3}
            futureScrollRange={3}
            showClosingKnob={true}
            markedDates={{
                '2023-01-26': {marked: true},
                '2023-01-28': {marked: true},
                '2023-01-27': {}
            }}
            renderEmptyDate = {() => {
                return (
                  <View style={{}}>
                    <Text>This is empty date!</Text>
                  </View>
                );}
            }
            refreshing={true}
            theme={{
                // backgroundColor: 'red',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: colors.primaryDark,
                selectedDayTextColor: 'white',
                todayTextColor: colors.primaryLight,
                todayBackgroundColor: 'white',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: colors.primaryDark,
                indicatorColor: 'blue',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
                // agendaDayTextColor: '#aaaa',
                // agendaDayNumColor: '#aaaa',
                agendaTodayColor: colors.primaryDark,
                agendaKnobColor: '#aaaa',
              }}
            />
            
        </View>
    )
}

export default TaskPlanScreen;
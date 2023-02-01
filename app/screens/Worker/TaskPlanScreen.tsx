import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import moment from 'moment';
import MainContainer from '../../components/MainContainer';
import { colors } from '../../config/colors';

interface Props {}

function TaskPlanScreen(props: unknown) {
    //Get data from work_on table (checkin,checkout,account_id,shift_code,OT,date) use 'shift_code' find shift data from shift table
    // example data format
        // No OT
        // '2023-01-25': [{checkin:'08.00',department: 'ต้มไก่', shiftTime: '08.00-16.00', height: 80}],
        // Have OT
        // '2023-01-25': [{checkin:'08.00',department: 'ต้มไก่', shiftTime: '08.00-16.00', height: 80},{OT_hour:'2',shiftTime: '08.00-16.00',department: 'ต้มไก่', height: 60}],

    // ===========================================================================
    // use for gen mockup data
    const data = {}
    const date = moment().subtract(5, 'day')
    for(let i = 1; i<20; i++){
        data[date.format('YYYY-MM-DD')] = [
            {checkin:date.isAfter(moment())?'':'08.00',
            department: 'ต้มไก่', 
            shiftTime: '08.00-16.00',
            status: date.isAfter(moment())?'':'ปกติ', 
            },
            i%3==1 && 
            {
            OTHour: '2',
            shiftTime: '08.00-16.00',
            department: 'ต้มไก่', 
            }
        ]
        date.add(1, 'day')
    }
    // ======================================================================================

    const renderItem = (reservation: any, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
        <TouchableOpacity
            style={[styles.item, { height: 80}]}
            // onPress={() => Alert.alert(reservation.name)}
        >
            <Text style={{ fontSize, color }}>{!reservation.OTHour? `เวลาเข้างาน  ${reservation.checkin? reservation.checkin:''}  น.( ${reservation.status? reservation.status:'ยังไม่เข้างาน'} )`:`จำนวนชั่วโมง OT  ${reservation.OTHour? reservation.OTHour:''}  ชม.`}</Text>
            <Text style={{ fontSize, color }}>{`เวลางาน  ${reservation.OTHour? `${reservation.shiftTime.split('-')[1]}-${moment(reservation.shiftTime.split('-')[1],'HH.mm').add(reservation.OTHour, 'hours').format('HH.mm')}`: reservation.shiftTime}  น.`}</Text>
            <Text style={{ fontSize, color }}>{`แผนก  ${reservation.department? reservation.department: '-'}`}</Text>
        </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
        <View style={styles.emptyDate}>
            <Text>No asks on this day</Text>
        </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    return (
        <MainContainer>
            <Agenda
            pastScrollRange={2}
            futureScrollRange={3}
            items={data}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            refreshing={true}
            style={{
                borderRadius: 20
            }}
            />
        </MainContainer>
        );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 15,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
    });

export default TaskPlanScreen;
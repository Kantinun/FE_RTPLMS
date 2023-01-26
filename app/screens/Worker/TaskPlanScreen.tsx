import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import moment from 'moment';
import { colors } from '../../config/colors';

interface Props {}

function TaskPlanScreen(props: unknown) {
    const [items, setItems] = useState<AgendaSchedule | undefined>();
    const loadItems = (day: DateData) => {
        const items = items || {};

        setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);

            if (!items[strTime]) {
            items[strTime] = [];

            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150)),
                day: strTime,
                });
            }
            }
        }

        const newItems: AgendaSchedule = {};
        Object.keys(items).forEach((key) => {
            newItems[key] = items[key];
        });
        setItems(newItems);
        }, 1000);
    };

    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
        <TouchableOpacity
            style={[styles.item, { height: reservation.height }]}
            onPress={() => Alert.alert(reservation.name)}
        >
            <Text style={{ fontSize, color }}>{reservation.name}</Text>
        </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
        <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
        </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    const timeToString = (time: number) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    return (
        <Agenda
        pastScrollRange={5}
        futureScrollRange={5}
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        />
        );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
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
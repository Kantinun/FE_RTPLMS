import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../config/colors';
import { DetailResponse } from '../services/detail.service';

function DetailsDataTable(props: any) {
    const [searchText, setSearchText] = useState('');

    const workPlanTableHead = ['Name', 'In - Out', 'Status'];
    const otPlanTableHead = ["Name", "Number of Hour", "Status"];

    const ot_hour_element = (value: any) => (
        <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginEnd: 5}}>{value}</Text>
            <Icon
                name='edit'
                // iconStyle={styles.Icon}
                color={colors.primary}
            />
        </View>
    )
    return (
        <ScrollView>
        <View>
            {(props.mode==='work_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
               <Row data={workPlanTableHead} style={styles.head} textStyle={styles.text}/>
               {props.dataPlan.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                    <Cell data={rowData.name} textStyle={styles.text}/>
                    <Cell data={rowData.checkInOut} textStyle={styles.text}/>
                    <Cell data={rowData.checkInStatus} textStyle={styles.text}/>
                </TableWrapper>
                ))
                }
            </Table>
            )}
            {(props.mode ==='ot_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={otPlanTableHead} style={styles.head} textStyle={styles.text} />
                {
                props.dataOt.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                    {/* {
                    rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 1 ? ot_hour_element(cellData) : cellData} textStyle={styles.text}/>
                    ))
                    } */}
                    <Cell data={rowData.name} textStyle={styles.text}/>
                    <Cell data={rowData.otDuration} textStyle={styles.text}/>
                    <Cell data={rowData.otStatus} textStyle={styles.text}/>
                </TableWrapper>
                ))
                }
            </Table>)}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#ddd' },
    text: { margin: 6, textAlign: 'center'},
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button_container: {
        flex:1, 
        flexDirection:'row', 
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
    Icon: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    row: { flexDirection: 'row', backgroundColor: 'white' },
})
export default DetailsDataTable;
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../config/colors';

function DetailsDataTable(props: any) {
    const [searchText, setSearchText] = useState('');
    const work_plan_data = {
        tableHead: ['Name', 'In - Out', 'Status'],
        tableData: [
            ['นาย ก', '9.00 -', 'ปกติ'],
            ['นาย ข', '9.00 - 13.00', 'ปกติ'],
            ['นาย ค', '-', 'ขาด'],
            ['นาย ง', '10.00 - ', 'สาย']
          ]
    }
    const ot_plan_data = {
        tableHead: ["Name", "Number of Hour", "Status"],
        tableData: [
            ['นาย ก', '2', 'กำลังรอ'],
            ['นาย ข', '1', 'ปฏิเสธ'],
            ['นาย ค', '1', 'กำลังรอ'],
            ['นาย ง', '3', 'ยอมรับ']
        ]
    }

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
        <View>
            {(props.mode==='work_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
               <Row data={work_plan_data.tableHead} style={styles.head} textStyle={styles.text} />
               <Rows data={work_plan_data.tableData} style={{backgroundColor: 'white'}} textStyle={styles.text}/>
            </Table>
            )}
            {(props.mode ==='ot_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={ot_plan_data.tableHead} style={styles.head} textStyle={styles.text} />
                {
                ot_plan_data.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                    {
                    rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 1 ? ot_hour_element(cellData) : cellData} textStyle={styles.text}/>
                    ))
                    }
                </TableWrapper>
                ))
                }
            </Table>)}
        </View>
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
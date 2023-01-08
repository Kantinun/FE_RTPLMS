import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
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
                iconStyle={styles.Icon}
                color={colors.primary}
            />
        </View>
    )
    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.container,{flex:2}]}>
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search here.."
                        style={{flex:1, borderWidth:1,textAlign:'center', borderColor:'#bbbb', backgroundColor:'white'}}
                    />
                    <Icon.Button
                        name='search1'
                        iconStyle={{ marginRight: 0 }}
                    ></Icon.Button>
                </View>
                <View style={styles.button_container}>
                    <View style={styles.button}>
                        <Icon.Button
                            name="plus"
                            iconStyle={ styles.Icon}
                            backgroundColor={colors.primary}                           
                        />
                    </View>
                    <View style={styles.button}>
                    <Icon.Button
                            name="minus"
                            iconStyle={{ marginRight: 0 }}
                            backgroundColor='#F5222D'
                        />
                    </View>
                </View>
            </View>
            {(props.mode==='work_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
               <Row data={workPlanTableHead} style={styles.head} textStyle={styles.text}/>
               <Rows data={props.dataPlan} style={{backgroundColor: 'white'}} textStyle={styles.text}/>
            </Table>
            )}
            {(props.mode ==='ot_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={otPlanTableHead} style={styles.head} textStyle={styles.text} />
                {
                props.dataOt.map((rowData, index) => (
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
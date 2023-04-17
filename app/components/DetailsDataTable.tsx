import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { Appcontext } from '../../AppContext';
import { colors } from '../config/colors';
import { getAccountInThisShift, getDataForPlanAndOt } from '../services/detail.service';
import { io } from "socket.io-client";
import env from "../config/env";

function DetailsDataTable(props: any) {
    const [dataPlan, setDataPlan] = useState([]);
    const [dataOt, setDataOt] = useState(props.dataOt);
    const workPlanTableHead = ['Name', 'In - Out', 'Status'];
    const otPlanTableHead = ["Name", "Hours", "Status"];
    const { state } = React.useContext(Appcontext);
    
    useEffect(()=>{
        // ===================
        // Web Socket
        // ===================
        const websocket = io(`${env.API_BASE}:${env.API_PORT}`);
        const updateAttendanceTopic = `${state.data.id}-attendance`;
        const updateRequestTopic = `${state.data.id}-request`;
        
        // Update worker's attendace
        websocket.on(updateAttendanceTopic, async (d: Object) => {
            await getAccountInThisShift(props.shiftCode).then((res) => {
                return getDataForPlanAndOt(res);
              }).then((data) => {
                
                setDataPlan(data.plan)
                setDataOt(data.ot);
              })
        });

        // Update worker's request
        websocket.on(updateRequestTopic, async (d: Object) => {
            await getAccountInThisShift(props.shiftCode).then((res) => {
                return getDataForPlanAndOt(res);
              }).then((data) => {
                
                setDataPlan(data.plan)
                setDataOt(data.ot);
              })
        });
        return () => {
            websocket.close();
        };
        // ===================
        // ===================
    },[]);

    useEffect(()=>{
        if(props.dataPlan!=dataPlan){
            setDataPlan(props.dataPlan)
        }
        if(props.dataOt!=dataOt){
            setDataOt(props.dataOt)
        }
    },[props.dataPlan,props.dataOt])


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
               {dataPlan.map((rowData, index) => 
               {
                return(
                <TableWrapper key={index} style={styles.row}>
                    <Cell data={rowData.name} textStyle={styles.text}/>
                    <Cell data={rowData.checkInOut} textStyle={styles.text}/>
                    <Cell data={rowData.checkInStatus} textStyle={styles.text}/>
                </TableWrapper>
                )})
                }
            </Table>
            )}
            {(props.mode ==='ot_plan') &&
            (<Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={otPlanTableHead} style={styles.head} textStyle={styles.text} />
                {
                dataOt.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                    {/* {
                    rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 1 ? ot_hour_element(cellData) : cellData} textStyle={styles.text}/>
                    ))
                    } */}
                    <Cell data={rowData.name} textStyle={styles.text}/>
                    <Cell data={`${rowData.otDuration} ชม.`} textStyle={styles.text}/>
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
    head: { height: 40, backgroundColor: '#ddd', borderTopStartRadius: 15, borderTopEndRadius: 15, marginTop: 10 },
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
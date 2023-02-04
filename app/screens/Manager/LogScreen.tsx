import React, { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appcontext} from '../../../AppContext'
import { ButtonGroup, Icon } from '@rneui/themed';
import MyDateTimePicker from '../../components/DateTimePicker';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { colors } from '../../config/colors';
import moment from 'moment';

const Stack = createNativeStackNavigator();

const Acction_btn = (props) => {
  return(
    <View style={{justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
    <Icon name={props.iconName} type={props.iconType} color={props.selected ?  'white': colors.primaryDark}></Icon>
    <Text style={{color: props.selected ? colors.primaryLight : props.textColor}}>{props.labelText}</Text>
  </View>
  )
}

// Fetch data once we open this page 
const fetch_data = [
  {log_id: 1, create_at:moment(), action: 'ADD', details:{department:'ต้มไก่',department_id: 1,account_id:[1]}},
  {log_id: 2, create_at:moment(), action: 'DELETE', details:{department:'ทอดไก่',department_id: 2,account_id:[2]}},
  {log_id: 3, create_at:moment(), action: 'ADD_OT', details:{department:'แพคไก่',department_id: 3,account_id:[3]}},
  {log_id: 4, create_at:moment(), action: 'EDIT_OT', details:{department:'ทำความสะอาดไก่',department_id: 4,account_id:[4]}},
  {log_id: 5, create_at:moment(), action: 'DELETE_OT', details:{department:'ต้มไก่',department_id: 1,account_id:[5]}}
]
const LogContext = () => {
  const [data, setData] = useState(fetch_data.filter((ele => ele.create_at.format('D/M/YYYY')==moment().format('D/M/YYYY'))))
  const [selectedIndexes, setSelectedIndexes] = useState([])
  const [date,setDate]=useState(new Date())
  const btn = [<Acction_btn textColor={colors.primaryDark} iconName='account-multiple-plus' iconType='material-community' labelText='เพิ่ม'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='account-multiple-minus' iconType='material-community' labelText='ลบ'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-plus' iconType='material-community' labelText='เพิ่ม OT'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-minus' iconType='material-community' labelText='ลบ OT'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-edit' iconType='material-community' labelText='แก้ไข OT'/>,
  ]
  return(
    <View style={{flex: 1}}>
      <View style={{marginTop:10, marginHorizontal: 5}}>
        <MyDateTimePicker date={date} setDate={setDate}/>
      </View>
      <View style={{height: '10%', marginVertical: 10}}>
        <ButtonGroup
          buttons={btn}
          containerStyle={{height:'100%', backgroundColor: 'transparent', borderColor:'transparent', borderRadius: 20}}
          buttonContainerStyle={{borderRadius: 20,marginHorizontal: 2}}
          buttonStyle={{
            elevation:2, 
            borderRadius:20, 
            backgroundColor: '#bbbe',
            borderColor: '#1115',
            borderRightWidth: 3,
            borderTopWidth: 2,
          }}
          selectMultiple={true}
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            let option: Array<string> = []
            value.map((index:number)=>{
              switch (index){
                case 0:
                  return option.push('ADD')
                case 1:
                  return option.push('DELETE')
                case 2:
                  return option.push('ADD_OT')
                case 3:
                  return option.push('DELETE_OT')
                case 4:
                  return option.push('EDIT_OT')
                default:
                  return option
              }
            })
            setData(option.length !=0 ?fetch_data.filter(data => option.includes(data.action)): fetch_data);
            setSelectedIndexes(value)
          }}
          selectedButtonStyle={{
            borderRadius:20,
            borderWidth:2,
            borderColor:"#1115",
            backgroundColor: 'white',
            elevation:0,
          }}
        />
      </View>
      <View style={{flex:1, marginTop: 10, marginHorizontal: 5}}>
        <Table>
          <Row data={['Date', 'Action', 'Department']}
          style={{backgroundColor: colors.primaryDark, height:40, borderTopEndRadius: 20, borderTopStartRadius: 20}} 
          textStyle={{textAlign: 'center', color:'white'}}
          ></Row>
          <ScrollView style={{height: '100%'}}>
            {data.map((rowData,index)=>(
              <TouchableOpacity>
              <TableWrapper key={index} style={{flexDirection:'row',borderWidth:1, borderColor:'#aaaa', backgroundColor:'#fffb',}}>
                <Cell data={rowData.create_at.format("D - MMM - YYYY")} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>

                <Cell data={rowData.action} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>

                <Cell data={rowData.details.department} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>
              </TableWrapper>
              </TouchableOpacity>
              ))}
          </ScrollView>
        </Table>
      </View>
    </View>
  )
}
function LogScreen(props) {5
    let {state,authContext} = useContext(Appcontext)

    return (
        //use Stack.Navigator to make log-out icon on header
        <Stack.Navigator
        screenOptions={{
            headerRight: () =>(
              <TouchableOpacity style={{marginRight:15}} onPress={authContext.signOut}>
                <Icon name='log-out-outline' type='ionicon'></Icon>
              </TouchableOpacity>
            ),
          }}
        >
            <Stack.Screen
                name='Log'
                component={LogContext}
            />
        </Stack.Navigator>
    );
}

export default LogScreen;
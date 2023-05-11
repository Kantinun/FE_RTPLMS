import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appcontext} from '../../../AppContext'
import { ButtonGroup, Icon } from '@rneui/themed';
import MyDateTimePicker from '../../components/DateTimePicker';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { colors } from '../../config/colors';
import moment from 'moment';
import { Dialog } from '@rneui/themed';
import { getDataForLogScreen, Log } from '../../services/log.service';
import { Action, State } from '../../../App';

const Stack = createNativeStackNavigator();


// Fetch data once we open this page 
// const fetch_data = [
//   {log_id: 1, create_at:moment(), action: 'ADD', details:{department:'ต้มไก่',department_id: 1,account_id:[1]}},
//   {log_id: 2, create_at:moment(), action: 'DELETE', details:{department:'ทอดไก่',department_id: 2,account_id:[2]}},
//   {log_id: 3, create_at:moment(), action: 'ADD_OT', details:{department:'แพคไก่',department_id: 3,account_id:[3]}},
//   {log_id: 4, create_at:moment(), action: 'EDIT_OT', details:{department:'ทำความสะอาดไก่',department_id: 4,account_id:[4]}},
//   {log_id: 5, create_at:moment(), action: 'DEsLETE_OT', details:{department:'ต้มไก่',department_id: 1,account_id:[5]}}
// ]
const Acction_btn = (props: any) => {
  return(
    <View style={{justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
    <Icon name={props.iconName} type={props.iconType} color={props.selected ?  'white': colors.primaryDark}></Icon>
    <Text style={{color: props.selected ? colors.primaryLight : props.textColor}}>{props.labelText}</Text>
  </View>
  )
}
const _render_details = (props:any) => {
  let data = props.data[0]
  return(
    <Dialog
      isVisible={props.visible}
      onBackdropPress={()=>{props.setVisible(false)}}
      overlayStyle={{borderRadius:20}}
    >
      <View style={{flexDirection:'row',}}>  
        <Dialog.Title title="Log Details" titleStyle={{textAlign:'left', flex:1}}/>
        <TouchableOpacity onPress={()=>{props.setVisible(false)}}>
          <Icon name='close' type='material-community' color='#aaa' size={25} />
        </TouchableOpacity>
      </View>
      <Text>{`Action: ${data? data.action:''}`}</Text>
      <Text>{`Department id: ${data? data.details.department_id:''}`}</Text>
      <Text>{`Department: ${data? data.details.department_name:''}`}</Text>
      <Text>{`Account id: ${data? data.details.account_id:''}`}</Text>
      <Text>{`Create at: ${data? moment(data.create_at).format('D MMMM YYYY'):''}`}</Text>
    </Dialog>
  )
}

const LogContext = (props) => {
  const [dialog_visible,setDialog_visible] = useState(false)
  const [rowSelected,setRowSelected] = useState(0)
  const [initData, setInitData] = useState<Log[]>([])
  const [data, setData] = useState<Log[]>([])
  const [filtersIndexes, setFiltersIndexes] = useState([])
  const [date,setDate]=useState(new Date())
  const btn = [<Acction_btn textColor={colors.primaryDark} iconName='account-multiple-plus' iconType='material-community' labelText='เพิ่ม'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='account-multiple-minus' iconType='material-community' labelText='ลบ'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-plus' iconType='material-community' labelText='เพิ่ม OT'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-minus' iconType='material-community' labelText='ลบ OT'/>,
  <Acction_btn textColor={colors.primaryDark} iconName='clock-edit' iconType='material-community' labelText='แก้ไข OT'/>,
]
  const fetch_data: Promise<any> = getDataForLogScreen(props.state.data.id, moment(date).format('YYYY-MM-DD') );
  useEffect(()=>{
    fetch_data.then((logs: Log[]) => {
      setInitData(logs? logs:[]);
      setData(logs? logs:[])
    });
  },[]);

  useEffect(()=>{
    const newData = initData.filter((row)=> (moment(row.create_at).format("DD/MM/YYYY")==moment(date).format("DD/MM/YYYY")))
    setData(newData? newData: initData)
  },[date])

  const handleChangeDate = async(date)=>{
    setDate(date)
    await getDataForLogScreen(props.state.data.id, moment(date).format('YYYY-MM-DD')).then((logs)=>{
      setInitData(logs? logs:[]);
      setData(logs? logs:[])
    })
  }
  return(
    <View style={{flex: 1}}>
      <View style={{marginTop:10, marginHorizontal: 5}}>
        <MyDateTimePicker date={date} setDate={handleChangeDate}/>
      </View>
      <View style={{height: '10%', marginVertical: 10}} testID = "btnGroup">
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
          selectedIndexes={filtersIndexes}
          onPress={(value) => {
            let option: Array<string> = []
            value.map((index:number)=>{
              switch (index){
                case 0:
                  return option.push('Add Worker')
                case 1:
                  return option.push('Delete Worker')
                case 2:
                  return option.push('Add OT')
                case 3:
                  return option.push('Delete OT')
                case 4:
                  return option.push('EDIT_OT')
                default:
                  return option
              }
            })
            setData(option.length !=0 ?initData.filter(data => option.includes(data.action)): initData);
            setFiltersIndexes(value)
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
      <View style={{marginTop: 10, marginHorizontal: 5, height: '85%'}}>
        <Table>
          <Row data={['Date', 'Action', 'Department']}
          style={{backgroundColor: colors.primaryDark, height:40, borderTopEndRadius: 20, borderTopStartRadius: 20}} 
          textStyle={{textAlign: 'center', color:'white'}}
          ></Row>
          <ScrollView style={{height: '80%'}}>
            <>
            {
              data.map((rowData,index)=>{
              return <TouchableOpacity 
                onPress={()=>{
                  setDialog_visible(true)
                  setRowSelected(parseInt(rowData.log_id))
                }}>
              <TableWrapper key={index} style={{flexDirection:'row',borderWidth:1, borderColor:'#aaaa', backgroundColor:'#fffb',}}>
                <Cell data={moment(rowData.create_at).format("D-MMM-YYYY")} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>

                <Cell data={rowData.action} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>

                <Cell data={rowData.details.department_name} 
                textStyle={{color:'#111a', textAlign: 'center', fontSize:15, marginVertical:10}}></Cell>
              </TableWrapper>
              </TouchableOpacity>
              })
            }</>
          </ScrollView>
        </Table>
      </View>
      <_render_details visible={dialog_visible} setVisible={setDialog_visible} data={data.filter(data => parseInt(data.log_id)==rowSelected)} />
    </View>
  )
}
function LogScreen(props:any) {
    let {state,authContext} = useContext(Appcontext)
    // Call Api 
    
    const RenderContext = () => {
      return <LogContext state={state}/>
    }

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
                component={RenderContext}
            />
        </Stack.Navigator>
    );
}

export default LogScreen;
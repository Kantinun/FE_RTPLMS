import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import MainContainer from '../../components/MainContainer';
import { Card, Icon, Button, ButtonGroup} from '@rneui/themed';
import RegularText from '../../../assets/Texts/RegularText';
import { colors } from '../../config/colors';
import moment from 'moment';
import { Appcontext } from '../../../AppContext';
import { getOtRequest, OtRequestResponse, updateRequest } from '../../services/otRequest.service';
import { io } from 'socket.io-client';
import env from "../../config/env";

const Acction_btn = (props: any) => {
    return(
      <View style={{justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
      <Icon name={props.iconName} type={props.iconType} color={props.selected ?  'white': colors.primaryDark}></Icon>
      <Text style={{color: props.selected ? colors.primaryLight : props.textColor}}>{props.labelText}</Text>
    </View>
    )
}

// const fetch_data = [
//     {shift_code:'3',Date: moment(), number_of_hour:2, work_time: '17:00-20:00', req_status: 'ยอมรับ', create_at: moment()},
//     {shift_code:'4',Date: moment().add(1,'days'), number_of_hour:1, work_time: '15:00-16:00', req_status: 'รอดำเนินการ', create_at:  moment()},
//     {shift_code:'5',Date: moment().add(2,'days'), number_of_hour:2, work_time: '17:00-20:00', req_status: 'ปฏิเสธ', create_at:  moment()},
//     {shift_code:'6',Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
//     {shift_code:'7',Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
//     {shift_code:'8',Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
//     {shift_code:'9',Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
// ]

function OTrequestScreen(props) {
    //  Data format: {shift_code:3,Date: '2023-02-01', number_of_hour:2, work_time: '17:00-20:00', req_status: null, create_at: '2023-01-31'}
    const [data, setData] = useState<OtRequestResponse[]>([])
    const [fetch_data, setFetchData] = useState<OtRequestResponse[]>([])
    const {state} = useContext(Appcontext);

    useEffect(()=>{
        // Fetch data
        const otRequestData = getOtRequest(state.data.id).then((res)=>{
            setData(res);
            setFetchData(res);
        });
        
        // ===================
        // Web Socket
        // ===================
        const websocket = io(`${env.API_BASE}:${env.API_PORT}`);
        const updateRequestTopic = `${state.data.id}-request`;
        
        // Update worker's request
        websocket.on(updateRequestTopic, async (d: Object) => {
            console.log('update: ',d)
            const otRequestData = getOtRequest(state.data.id).then((res)=>{
                setData(res);
                setFetchData(res);
            });
        });

        return () => {
            websocket.close();
        };
        // ===================
        // ===================

    },[]);

    const ot_respond_handler = (shift_code:string, action: string) => {
        
        updateRequest(state.data.id, shift_code, action).then(res=>{
            let new_data: OtRequestResponse[] = data.map((data)=>{
                if (data.shift_code===shift_code){
                    return {...data, req_status: action}
                }
                return data;
            })
            setFetchData(new_data)
            setData(new_data);
        })
    }

    const btn = [<Acction_btn textColor={colors.primaryDark} iconName='clock-outline' iconType='material-community' labelText='รอดำเนินการ'/>,
    <Acction_btn textColor={colors.primaryDark} iconName='check-circle' iconType='material-community' labelText='ยอมรับ'/>,
    <Acction_btn textColor={colors.primaryDark} iconName='close-circle' iconType='material-community' labelText='ปฏิเสธ'/>]
    const [filtersIndexes, setFiltersIndexes] = useState([])

    return (
        <MainContainer>
            <View style={{height: '10%',}}>
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
                        return option.push('รอดำเนินการ')
                        case 1:
                        return option.push('ยอมรับ')
                        case 2:
                        return option.push('ปฏิเสธ')
                        default:
                        return option
                    }
                    })
                    setData(option.length !=0 ?fetch_data.filter(data => option.includes(data.req_status)): fetch_data);
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
            <ScrollView>
                {data.map((data,index)=>{
                    return(
                        <Card
                            key={index}
                            containerStyle={{borderRadius: 15}}
                        >
                            <View style={{flexDirection: 'row', justifyContent: data.req_status==='รอดำเนินการ'? 'center':'flex-start'}}>
                                {data.req_status==="รอดำเนินการ"?
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                <Icon 
                                    type='material-community' 
                                    name={data.req_status==='รอดำเนินการ'? 'clock-outline':(data.req_status==='ยอมรับ'? 'check-circle':'close-circle')} 
                                    color={data.req_status==='รอดำเนินการ'? '':(data.req_status==='ยอมรับ'? colors.green:colors.red)}
                                    size={30}
                                    style={{marginLeft:10}}>
                                </Icon>
                                </View>
                                :
                                <View style={{justifyContent:'center', alignItems:'center', marginHorizontal: 10}}>
                                    <Icon 
                                        type='material-community' 
                                        name={data.req_status==='ยอมรับ'? 'check-circle':'close-circle'} 
                                        color={data.req_status==='ยอมรับ'? colors.green:colors.red}
                                        size={30}
                                    />
                                    <Text
                                        style={{color: data.req_status==='ยอมรับ'? colors.green:colors.red}}
                                    >{data.req_status}</Text>
                                </View>
                                }
                                <View style={{marginHorizontal: 10,}}>
                                    <RegularText>วันที่ {moment(data.date).format('D MMMM YYYY')}</RegularText>
                                    <RegularText>เวลา {data.work_time}</RegularText>
                                    <RegularText>({data.number_of_hour} ชม.)</RegularText>
                                    <Text style={{color: '#aaaa'}}
                                    >create at: {moment(data.create_at).format('D MMMM YYYY')}</Text>
                                </View>
                                { data.req_status==='รอดำเนินการ'&&
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Button
                                        icon={<Icon 
                                                name='check-circle' 
                                                type='material-community' 
                                                size={25} 
                                                color={colors.green}
                                            ></Icon>}
                                        buttonStyle={{
                                            backgroundColor: 'transparent',
                                            borderRadius: 10,
                                        }}
                                        raised
                                        containerStyle={{borderRadius:10, marginHorizontal:5}}
                                        onPress={()=>{
                                            ot_respond_handler(data.shift_code,'ยอมรับ')
                                        }}
                                        testID='accept-btn'
                                    ></Button>
                                    <Button
                                        icon={<Icon name='close-circle' type='material-community' size={25} color={colors.red}></Icon>}
                                        buttonStyle={{
                                            backgroundColor: 'transparent',
                                            borderRadius: 10,
                                        }}
                                        containerStyle={{borderRadius:10,marginHorizontal:5}}
                                        raised
                                        onPress={()=>{
                                            ot_respond_handler(data.shift_code,'ปฏิเสธ')
                                        }}
                                        testID='reject-btn'
                                    ></Button>
                                </View>}
                            </View>
                        </Card>
                    )
                })}
            </ScrollView>
        </MainContainer>
    );
}

export default OTrequestScreen;

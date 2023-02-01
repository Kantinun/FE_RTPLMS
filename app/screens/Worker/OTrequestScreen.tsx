import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import MainContainer from '../../components/MainContainer';
import { Card, Icon, Button} from '@rneui/themed';
import RegularText from '../../../assets/Texts/RegularText';
import { colors } from '../../config/colors';
import moment from 'moment';

//  Data format: {shift_code:3,Date: '2023-02-01', number_of_hour:2, work_time: '17:00-20:00', req_status: null, create_at: '2023-01-31'}
const mockupData = [
    {shift_code:3,Date: moment(), number_of_hour:2, work_time: '17:00-20:00', req_status: 'ยอมรับ', create_at: moment()},
    {shift_code:3,Date: moment().add(1,'days'), number_of_hour:1, work_time: '15:00-16:00', req_status: 'รอดำเนินการ', create_at:  moment()},
    {shift_code:3,Date: moment().add(2,'days'), number_of_hour:2, work_time: '17:00-20:00', req_status: 'ปฏิเสธ', create_at:  moment()},
    {shift_code:3,Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
    {shift_code:3,Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
    {shift_code:3,Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
    {shift_code:3,Date: moment().add(3,'days'), number_of_hour:1, work_time: '05:00-06:00', req_status: 'รอดำเนินการ', create_at:  moment()},
]
function OTrequestScreen(props) {
    return (
        <MainContainer>
            <ScrollView>
                {mockupData.map((data,index)=>{
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
                                    <RegularText>วันที่ {moment(data.Date).format('D MMMM YYYY')}</RegularText>
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
                                    ></Button>
                                    <Button
                                        icon={<Icon name='close-circle' type='material-community' size={25} color={colors.red}></Icon>}
                                        buttonStyle={{
                                            backgroundColor: 'transparent',
                                            borderRadius: 10,
                                        }}
                                        containerStyle={{borderRadius:10,marginHorizontal:5}}
                                        raised
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
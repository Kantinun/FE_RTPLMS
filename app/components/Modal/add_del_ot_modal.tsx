import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { ButtonGroup } from '@rneui/themed'
import { colors } from '../../config/colors';
import { Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import {CheckBox} from '@rneui/themed'
import {SearchBar} from '@rneui/themed'

function Add_del_ot_modal(props) {
    
    const [searchText,setSearchText] = useState('')

    const headerAdd = ['Name', 'Perf.','hour']
    const mockupAddData = [
      {name:'นาย ก', performance:10, isCheck: true},
      {name:'นาย ข', performance:5, isCheck: false},
      {name:'นาย ค', performance:7, isCheck: true},
      {name:'นาย ง', performance:8, isCheck: false},
      {name:'นาย จ', performance:8, isCheck: true},
    ]
    const headerDel = ['','Name','Hours']
    const [mockupDelData, setMockupDelData] = useState([
      {id:1, name:'นาย ก', performance:10, hour: 4, isCheck: false},
      {id:2, name:'นาย ข', performance:5, hour: 3, isCheck: false},
      {id:3, name:'นาย ค', performance:7, hour: 3, isCheck: false},
      {id:4, name:'นาย ง', performance:8, hour: 2, isCheck: false},
      {id:5, name:'นาย จ', performance:8, hour: 4, isCheck: false},
    ])

    const [position, setPosition] = useState(0)
    const indicatorStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 40,
      separatorStrokeWidth: 3,
      currentStepStrokeWidth: 5,
      separatorFinishedColor: colors.primaryLight,
      separatorUnFinishedColor: '#dddd',
      stepIndicatorFinishedColor: colors.primaryLight,
      stepIndicatorUnFinishedColor: '#aaaaaa',
      stepStrokeCurrentColor: colors.primaryDark,
      stepIndicatorCurrentColor: colors.primaryDark,
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepIndicatorLabelCurrentColor: '#000000',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
      labelColor: '#888888',
      labelSize: 15,
      currentStepLabelColor: '#111111',
      };
    const onStepPress = (position: number) => {
        setPosition(position);
    };
    const [selected_method, setSelected_method] = React.useState(null);

    const _renderAddForm = () => {
      const [btn_group_index, setBtn_group_index] = useState(0)
      const data = [
        { label: 'เลือกพนักงานด้วยตนเอง', value: 'เลือกพนักงานด้วยตนเอง' },
        { label: 'จำหน่ายงานตามลำดับการเข้างาน', value: 'จำหน่ายงานตามลำดับการเข้างาน' },
      ]  
      return(
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15}}>หน่วย : </Text>
            <ButtonGroup
              buttons={['คน', 'ชั่วโมง']}
              onPress={(index) => {
                setBtn_group_index(index)
              }}
              containerStyle={{ marginBottom: 20, flex:1}}
              selectedButtonStyle={{borderColor: colors.primary, backgroundColor: 'white', borderWidth: 2}}
              selectedTextStyle={{color: colors.primary}}
            ></ButtonGroup>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15}}>จำนวน : </Text>
            <Input
              containerStyle={{flex: 1,}}
              inputContainerStyle={{borderWidth:1, padding: 5, borderRadius: 5, borderColor: '#aaaa'}}
              // errorMessage="Oops! that's not correct."
              placeholderTextColor='#aaaa'
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{textAlign: 'center', fontSize: 15}}
              placeholder="กรอกจำนวน"
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>วิธีจำหน่ายงาน</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search={false}
              maxHeight={300}
              activeColor={colors.primaryLight}
              labelField="label"
              valueField="value"
              placeholder="เลือกวิธีการจำหน่ายงาน"
              value={selected_method}
              dropdownPosition='bottom'
              onChange={item => {
                setSelected_method(item.value);
              }}
              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="user-plus" size={15} />
              )}
            />
          </View>
        </View>
      )
    }

    const _renderDelForm = ()=> {
      return(
        <View style={{width: '100%', justifyContent: 'center', paddingLeft: 5, paddingRight:5}}>
          <SearchBar
            placeholder='Search Here...'
            containerStyle={{backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius:20, borderTopWidth: 0, borderBottomWidth: 0}}
            inputContainerStyle={{backgroundColor: '#eeee'}}
            round={true}
            lightTheme={true}
            value={searchText}
            onChange={(text)=>{setSearchText(text)}}
          ></SearchBar>
          <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={headerDel} style={styles.head} textStyle={styles.text} />
                {
                mockupDelData.map((rowData, index) => (
                <TableWrapper style={{ flexDirection: 'row'}}>
                  <Cell data={<CheckBox
                    center
                    checked={rowData.isCheck}
                    onPress={() => handleCheckboxClick(rowData.id)}
                  />}> 
                  </Cell>
                  <Cell data={<Text style={{textAlign: 'center'}}>{rowData.name}</Text>}> </Cell>
                  <Cell data={<Text style={{textAlign: 'center'}}>{rowData.hour}</Text>}> </Cell>
                </TableWrapper>
                ))
                }
            </Table>
        </View>
      )
    }
    const handleCheckboxClick = (id) => {
      let tmp = mockupDelData.map((content)=>{
            if (content.id === id){
              return {...content, isCheck: !content.isCheck}
            }
            return content
          })
          setMockupDelData(tmp)
    }

    const _renderConfirmPage = (data: unknown) => {
      const checkedPerson = data.filter((obj)=> obj.isCheck)
      return(
        <View style={{alignItems: 'center', width: '100%'}}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={headerAdd} style={styles.head} textStyle={styles.text} />
                {
                checkedPerson.map((rowData, index) => (
                <TableWrapper style={styles.row}>
                  <Cell data={rowData.name} textStyle={styles.text}/>
                  <Cell data={rowData.performance} textStyle={styles.text}></Cell>
                  <Cell data={rowData.hour? rowData.hour: 2} textStyle={styles.text}></Cell>
                </TableWrapper>
                ))
                }
            </Table>
        </View>
      )
    }
    return (
        <Modal 
            isVisible={props.visible}
            onBackdropPress={()=>{props.clickHandler(!props.visible)}}
        >
            <View style={{flex: 1}}>
                <View
                    style={{
                        marginTop: 17,
                        backgroundColor: "#ffffff",
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 17,
                        flex: 3,
                        borderRadius:20,
                    }}
                >
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                        stepCount={2}
                        customStyles={indicatorStyles}
                        currentPosition={position}
                        onPress={onStepPress}
                        labels={[props.mode==='add'? 'กรอกข้อมูล' : 'เลือกงาน OT', 'ยืนยันข้อมูล']}
                        />
                    </View>
                    <View style={{flex: 1}}>
                      <Swiper
                          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}
                          loop={false}
                          index={position}
                          autoplay={false}
                          showsButtons={false}
                          showsPagination={false}
                          bounces={true}
                          onIndexChanged={(page) => {
                          setPosition(page);
                          }}
                      >
                        <View>
                          {props.mode == 'add'?_renderAddForm(): _renderDelForm()}
                        </View>
                        <View>
                          {props.mode == 'add'? _renderConfirmPage(mockupAddData): _renderConfirmPage(mockupDelData)}
                        </View>
                      </Swiper>
                        <View style={{width:'100%', justifyContent: 'space-between', padding: 15, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeee'}}>
                          <Button
                            disabled={position==0} 
                            title='Previous' 
                            onPress={()=>{
                              setPosition(position-1)
                          }}></Button>
                          {position < 1?
                            <Button title='Next' onPress={()=>{
                              setPosition(position+1)
                            }}></Button> 
                          :
                            <Button title='Comfirm' onPress={()=>{
                              setPosition(0)
                              props.clickHandler(false)
                            }}></Button> 
                          }
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    stepIndicator: {
      marginTop: 40,
      marginBottom: 20,
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#aaaa',
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#aaaa'
    },
    selectedTextStyle: {
      fontSize: 15,
      marginHorizontal: 10,
      textAlign: 'center'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 18,
      color: colors.primary
    },
    head: { height: 40, backgroundColor: '#ddd', width: '100%'},
    text: { margin: 6, textAlign: 'center'},
    row: { flexDirection: 'row', backgroundColor: 'white' },

  });
export default Add_del_ot_modal;
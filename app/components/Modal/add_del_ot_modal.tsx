import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { ButtonGroup } from '@rneui/themed'
import { colors } from '../../config/colors';
import { Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import {CheckBox,Button,SearchBar} from '@rneui/themed'
import { ScrollView } from 'react-native-gesture-handler';
import BigText from '../../../assets/Texts/BigText';

function Add_del_ot_modal(props: unknown) {
  const [searchText,setSearchText] = useState('')
  
  const headerAdd = ['Name', 'Perf.','Hours']
  const headerAddManual = ['','Name','Perf.']
  const headerDel = ['','Name','Hours']

  const [fetchData, setFetchData] = useState([])
  const [data, setData] = useState([])

  
  useEffect(()=>{
      const tmp_data = props.data.reduce((request_list, req)=> {
        request_list.push({
          account_id: req.account_id,
          name: req.name, 
          performance: req.performance,
          hour: req.otDuration? req.otDuration:null,
          isCheck: false
        })
        return request_list
      },[])
      setFetchData(tmp_data)
      setData(tmp_data)
  },[props.data])

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
      stepIndicatorLabelCurrentColor: 'white',
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
    const [btn_group_index, setBtn_group_index] = useState(null)
    const [value, setValue] = useState('')

    const resetParameter=()=>{
      setPosition(0)
      setSelected_method(null)
      setBtn_group_index(null)
      setValue('')
      setSearchText('')

      setData(fetchData)
    }

    const handle_search = (text: string) => {
      setSearchText(text)
      let newData = fetchData.filter((ele)=>ele.name.toLowerCase().includes(text.toLowerCase()))
      setData(newData? newData: fetchData)
    }

    const _renderAddForm = () => {
      const options = [
        { label: 'เลือกพนักงานด้วยตนเอง', value: 'เลือกพนักงานด้วยตนเอง' },
        { label: 'ทุกคนในกะ', value: 'ทุกคนในกะ' },
        { label: 'จำหน่ายงานตามลำดับการเข้างาน', value: 'จำหน่ายงานตามลำดับการเข้างาน' },
        { label: 'กำหนดเอง', value: 'กำหนดเอง' },
      ]  
      return(
        <View style={{alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>วิธีจำหน่ายงาน</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={options}
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
          { (selected_method == 'จำหน่ายงานตามลำดับการเข้างาน'||selected_method==='กำหนดเอง') &&
          (<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between', borderRadius: 10}}>
            <Text style={{fontSize: 15}}>จำนวน : </Text>
            <Input
              containerStyle={{flex: 1,}}
              inputContainerStyle={{borderWidth:1, padding: 5, borderRadius: 10, borderColor: (selected_method==='เลือกพนักงานด้วยตนเอง'||selected_method==='ทุกคนในกะ')? '#aaa':colors.primary, alignSelf: 'center', marginTop: 20}}
              placeholderTextColor='#aaaa'
              inputStyle={{textAlign: 'center', fontSize: 15}}
              placeholder="กรอกจำนวน"
              onChangeText={(text)=>{setValue(text)}}
              value={value? value: ''}
              disabled={selected_method==='เลือกพนักงานด้วยตนเอง'||selected_method==='ทุกคนในกะ'}
              keyboardType='numeric'
              
            />
          </View>)}
          { (selected_method == 'จำหน่ายงานตามลำดับการเข้างาน'||selected_method==='กำหนดเอง') &&
          (<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15}}>หน่วย : </Text>
            <ButtonGroup
              buttons={['คน', 'ชั่วโมง']}
              onPress={(index) => {
                setBtn_group_index(index)
              }}
              selectedIndex={selected_method==='กำหนดเอง'? 1:btn_group_index}
              buttonContainerStyle={{borderColor: 'white', borderRadius:15}}
              containerStyle={{ marginBottom: 20, flex:1, borderColor: 'white', borderRadius:15}}
              textStyle={{fontSize: 15}}
              buttonStyle={{borderColor: colors.primary, backgroundColor: 'white', borderWidth: 1, borderRadius: 15}}
              selectedButtonStyle={{backgroundColor: colors.primaryDark}}
              selectedTextStyle={{color: 'white'}}
              disabled={selected_method==='กำหนดเอง'}
              disabledStyle={{borderColor: '#aaaa'}}
              disabledSelectedStyle={{backgroundColor: colors.primaryDark}}
              disabledSelectedTextStyle={{color:'white'}}
            ></ButtonGroup>
          </View>
          )}
          {(selected_method == 'เลือกพนักงานด้วยตนเอง'||selected_method==='กำหนดเอง') &&(
            <View style={{width: '100%'}}>
              <SearchBar
                placeholder='Search Here...'
                containerStyle={{backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius:20, borderTopWidth: 0, borderBottomWidth: 0}}
                inputContainerStyle={{backgroundColor: '#eeee'}}
                round={true}
                lightTheme={true}
                value={searchText}
                onChangeText={(text)=>{
                  handle_search(text)
                }}
              ></SearchBar>

              <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                  <Row data={headerAddManual} style={styles.head} textStyle={styles.text} />
                  {
                  data.map((rowData, index) => {
                  return(
                  <TableWrapper style={{ flexDirection: 'row'}}>
                    <Cell data={<CheckBox
                      center
                      checked={rowData.isCheck}
                      onPress={() => handleCheckboxClick(rowData.account_id)}
                    />}> 
                    </Cell>
                    <Cell data={<Text style={{textAlign: 'center'}}>{rowData.name}</Text>}> </Cell>
                    <Cell data={<Text style={{textAlign: 'center'}}>{rowData.performance}</Text>}> </Cell>
                  </TableWrapper>
                  )}
                  
                  )
                  }
              </Table>
            </View>
          )}
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
            onChangeText={(text)=>{
              handle_search(text)
            }}
          ></SearchBar>
          <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                <Row data={headerDel} style={styles.head} textStyle={styles.text} />
                {
                data.map((rowData, index) => (
                <TableWrapper style={{ flexDirection: 'row'}}>
                  <Cell data={<CheckBox
                    center
                    checked={rowData.isCheck}
                    onPress={() => handleCheckboxClick(rowData.account_id)}
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
      let tmp = data.map((content)=>{
            if (content.account_id === id){
              return {...content, isCheck: !content.isCheck}
            }
            return content
          })
          setData(tmp)
    }

    const _renderConfirmPage = (data: unknown) => {
      const checkedPerson = data.filter((obj)=> obj.isCheck)
      return(
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
      )
    }
    return (
        <Modal 
            isVisible={props.visible}
            onBackdropPress={()=>{
              props.clickHandler(!props.visible)
              resetParameter()
            }}
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
                  <BigText style={{marginTop:20}}>{props.mode==="add"? 'เพิ่มงานล่วงเวลา':'ลดงานล่วงเวลา'}</BigText>
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
                    <ScrollView style={{marginHorizontal: 5}}>
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
                          {_renderConfirmPage(data)}
                        </View>
                      </Swiper>
                      </ScrollView>
                        <View style={{width:'100%', justifyContent: 'space-between', padding: 15, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeee'}}>
                          <Button
                            disabled={position==0} 
                            title='Previous' 
                            containerStyle={styles.footer_btn}
                            onPress={()=>{
                              setPosition(position-1)
                          }}></Button>
                          {position < 1?
                            <Button title='Next' 
                              containerStyle={styles.footer_btn}
                              onPress={()=>{
                                setPosition(position+1)
                            }}></Button> 
                          :
                            <Button title='Comfirm' 
                              containerStyle={styles.footer_btn}
                              onPress={()=>{
                                resetParameter()
                                props.handleConfirm("delete",data.filter((obj)=> obj.isCheck).map(req=>req.account_id))
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
    head: { height: 40, backgroundColor: '#ddd', width: '100%', borderTopStartRadius: 15, borderTopEndRadius: 15},
    text: { margin: 6, textAlign: 'center'},
    row: { flexDirection: 'row', backgroundColor: 'white' },
    footer_btn:{
      borderRadius: 10,
    }

  });
export default Add_del_ot_modal;
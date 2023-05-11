import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, FlatList} from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';
import { SearchBar,CheckBox, Button, Icon} from '@rneui/themed'
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import { colors } from '../../config/colors';
import Swiper from 'react-native-swiper';
import BigText from '../../../assets/Texts/BigText';

const Add_del_worker_modal = (props: any) => {
  const [data, setData] = useState({...props.data});

  useEffect(()=>{
    setData({...props.data})
  }, [props.data])
  
  const [searchText, setSearchText]= useState('')
  const handleCheckboxClick = (id) => {
    let tmp = data.content.map((content)=>{
          if (content.account_id === id){
            return {...content, isChecked: !content.isChecked}
          }
          return content
        })
        let newData = {
          header: data.header,
          content: tmp
        }
        props.confirmHandler(newData)
  }
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
      const resetParameter=()=>{
        setPosition(0)
        setSearchText('')
      }
      const onStepPress = (position: number) => {
          setPosition(position);
      };
  const handleSearch = (text: string) => {
    setSearchText(text)
    let new_data = data
    let filter_data = props.data.content.filter((row_data)=> row_data.name.toLowerCase().includes(text.toLowerCase()))
    new_data.content = filter_data? filter_data: props.data.content
    setData(new_data)
  }
  const _renderForm  = () => {
    return(
      <FlatList
        data={data.content}
        keyExtractor={item => item.account_id.toString()}
        renderItem={({ item }) => (
          <TableWrapper style={{ flexDirection: 'row'}}>
            <Cell data={<CheckBox
              center
              checked={item.isChecked}
              onPress={() => handleCheckboxClick(item.account_id)}
              testID='checkbox'
            />}/> 
            <Cell data={<Text style={{textAlign: 'center'}}>{item.name}</Text>}/>
            <Cell data={<Text style={{textAlign: 'center'}}>{item.performance}</Text>}/>
          </TableWrapper>
        )}
      />
    )
  }

  const _renderConfirmPage = (props) => {
    const checkedPerson = props.data.content? props.data.content.filter((obj)=> obj.isChecked): []
    return(
      <FlatList
        data={checkedPerson}
        keyExtractor={item => item.account_id}
        renderItem={({ item }) => (
          <TableWrapper style={styles.row}>
            <Cell data={item.name} textStyle={styles.text}/>
            <Cell data={item.performance} textStyle={styles.text}></Cell>
          </TableWrapper>
          )}
      />
    )
  }

  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={() => {
        props.clickHandler(false);
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
                  <BigText style={{marginTop:20}}>{props.mode==="add"? 'เพิ่มพนักงาน':'ลดพนักงาน'}</BigText>
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                        stepCount={2}
                        customStyles={indicatorStyles}
                        currentPosition={position}
                        onPress={onStepPress}
                        labels={['เลือกพนักงาน', 'ยืนยันข้อมูล']}
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
                      <View style={{backgroundColor: 'white', width: '100%', borderRadius: 20, paddingTop: 10, flex: 1}}>
                        <SearchBar
                          testID='add-worker-search-bar'
                          placeholder='Search Here...'
                          containerStyle={{backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius:20, borderTopWidth: 0, borderBottomWidth: 0}}
                          inputContainerStyle={{backgroundColor: '#eeee'}}
                          round={true}
                          lightTheme={true}
                          value={searchText}
                          onChangeText={(text)=>{
                            handleSearch(text)
                          }}
                        ></SearchBar>
                        <Row data={["","ชื่อ-นามสกุล", "กำลังการผลิต"]} style={styles.head} textStyle={styles.text} />
                        <_renderForm/>
                      </View>
                      <Table 
                        borderStyle={{borderWidth: 2, borderColor: '#eee',}}
                        style={styles.table}
                      >
                        <Row data={["ชื่อ-นามสกุล", "กำลังการผลิต"]} style={styles.head} textStyle={styles.text} />
                        <_renderConfirmPage data={data} />
                      </Table>
                      </Swiper>
                        <View style={{width:'100%', justifyContent: 'space-between', padding: 15, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeee'}}>
                          <Button
                            disabled={position==0} 
                            title='Previous' 
                            containerStyle={styles.footer_btn}
                            onPress={()=>{
                              setPosition(position-1)
                          }}
                          testID='Previous'
                          ></Button>
                          {position < 1?
                            <Button title='Next' 
                              containerStyle={styles.footer_btn}
                              onPress={()=>{
                                setPosition(position+1)
                              }}
                              testID='Next'
                            ></Button> 
                          :
                            <Button title='Confirm' 
                              containerStyle={styles.footer_btn}
                              onPress={()=>{
                                resetParameter()
                                props.clickHandler(false)
                                props.handleConfirm(props.mode)
                              }}
                              testID='Confirm'
                            ></Button>
                          }
                        </View>
                    </View>
                </View>
            </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#ddd', borderTopStartRadius: 15, borderTopEndRadius: 15},
  text: { margin: 6, textAlign: 'center'},
  footer_btn:{
    borderRadius: 10,
  },
  stepIndicator: {
    marginTop: 20,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', backgroundColor: 'white' },
  table:{width: '98%', alignSelf:'center'},
})
export default Add_del_worker_modal;

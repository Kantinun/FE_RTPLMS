import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput} from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';
import { SearchBar,CheckBox, Button, Icon} from '@rneui/themed'
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import { colors } from '../../config/colors';
import Swiper from 'react-native-swiper';

const Add_del_worker_modal = (props: any) => {
  let data = props.data
  const [searchText, setSearchText] = useState('');
  const handleCheckboxClick = (id) => {
    let tmp = data.content.map((content)=>{
          if (content.id === id){
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
        setSearchText(text);
      };
  const _renderForm  = () => {
    return(
      <View style={{backgroundColor: 'white', width: '100%', borderRadius: 20, paddingTop: 10, flex: 1}}>
        {/* <View style={{height:'10%', 
                      width:'90%', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      flexDirection: 'row', 
                      backgroundColor:'#eeee', 
                      borderRadius:10, 
                      alignSelf: 'center',
                      marginBottom: 10
                    }}>
          <Icon type='ionicon' name='search-sharp' size={15} color='#aaae' />
          <TextInput
              style={{ height: '100%', width: '80%', borderRadius: 10, padding: 10 }}
              placeholder="SEARCH WORKER HERE ..."
              placeholderTextColor="#aaae"
              onChangeText={handleSearch}
              value={searchText}
            />
        </View> */}
        <SearchBar
            placeholder='Search Here...'
            containerStyle={{backgroundColor: 'white', borderRadius: 15}}
            inputContainerStyle={{backgroundColor: '#eeee'}}
            round={true}
            lightTheme={true}
            value={searchText}
            onChangeText={(text)=>{
              handleSearch(text)
            }}
          ></SearchBar>
        <ScrollView>
        <Table borderStyle={{borderWidth: 2, borderColor: '#eee', borderRadius:5}}>
            <Row data={data.header} style={styles.head} textStyle={styles.text}></Row>
              {
                data.content.map((item)=>(
                  <TableWrapper style={{ flexDirection: 'row'}}>
                    <Cell data={<CheckBox
                      center
                      checked={item.isChecked}
                      onPress={() => handleCheckboxClick(item.id)}
                    />}> 
                    </Cell>
                    <Cell data={<Text style={{textAlign: 'center'}}>{item.name}</Text>}> </Cell>
                    <Cell data={<Text style={{textAlign: 'center'}}>{item.performance}</Text>}> </Cell>
                  </TableWrapper>
                ))
              }
        </Table>
        </ScrollView>
      </View>
    )
  }

  const _renderConfirmPage = (props) => {
    const checkedPerson = props.data.content? props.data.content.filter((obj)=> obj.isChecked): []
    return(
      <View style={{alignItems: 'center', width: '100%'}}>
        <Table 
          borderStyle={{borderWidth: 2, borderColor: '#eee',}}
          style={{width: '100%'}}
        >
              <Row data={["ชื่อ-นามสกุล", "กำลังการผลิต"]} style={styles.head} textStyle={styles.text} />
              {
              checkedPerson.map((rowData, index) => (
              <TableWrapper style={styles.row}>
                <Cell data={rowData.name} textStyle={styles.text}/>
                <Cell data={rowData.performance} textStyle={styles.text}></Cell>
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
                        <_renderForm/>
                        <_renderConfirmPage data={data} />
                      </Swiper>
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
                                props.clickHandler(false)
                                props.handleConfirm(props.mode)
                            }}></Button> 
                          }
                        </View>
                    </View>
                </View>
            </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#ddd' },
  text: { margin: 6, textAlign: 'center'},
  footer_btn:{
    borderRadius: 10,
  },
  stepIndicator: {
    marginTop: 40,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', backgroundColor: 'white' },
})
export default Add_del_worker_modal;

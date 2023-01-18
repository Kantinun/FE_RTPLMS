import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { ButtonGroup } from '@rneui/themed'
import { colors } from '../../config/colors';
import { Input } from '@rneui/themed';
import { SelectList } from 'react-native-dropdown-select-list'

function Add_del_ot_modal(props) {
    const [position, setPosition] = useState(0)
    const thirdIndicatorStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#7eaec4',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#7eaec4',
        stepStrokeUnFinishedColor: '#dedede',
        separatorFinishedColor: '#7eaec4',
        separatorUnFinishedColor: '#dedede',
        stepIndicatorFinishedColor: '#7eaec4',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#7eaec4',
      };
    const onStepPress = (position: number) => {
        setPosition(position);
    };
    const _renderForm = () => {
      const [btn_group_index, setBtn_group_index] = useState(0)
      const [selected_method, setSelected_method] = React.useState("");
      const data = [
        {key:'1', value:'เลือกพนักงานด้วยตนเอง'},
        {key:'2', value:'จำหน่ายงานตามลำดับการเข้างาน'},
    ]  
      return(
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15}}>หน่วย : </Text>
            <ButtonGroup
              buttons={['คน', 'ชั่วโมง']}
              selectedIndex={btn_group_index}
              onPress={(index) => {
                setBtn_group_index(index)
              }}
              containerStyle={{ marginBottom: 20, flex:1}}
              selectedButtonStyle={{borderColor: colors.primary, backgroundColor: 'white', borderWidth: 2}}
              selectedTextStyle={{color: colors.primary}}
            ></ButtonGroup>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15}}>จำนวน : </Text>
            <Input
              containerStyle={{flex: 1}}
              inputContainerStyle={{borderWidth:1, padding: 5, borderRadius: 5}}
              // errorMessage="Oops! that's not correct."
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{textAlign: 'center'}}
              placeholder="Enter Value"
            />
          </View>
          <SelectList 
            setSelected={(val: string) => setSelected_method(val)} 
            data={data} 
            save="value"
            search={false}
            dropdownItemStyles={{borderBottomWidth: 1}}
            dropdownTextStyles={{textAlign: 'center'}}
        />
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
                    }}
                >
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                        stepCount={3}
                        customStyles={thirdIndicatorStyles}
                        currentPosition={position}
                        onPress={onStepPress}
                        labels={['กรอกข้อมูล', 'ยืนยันข้อมูล', 'สำเร็จ']}
                        />
                    </View>
                    <View style={{flex: 1}}>
                      <Swiper
                          loop={false}
                          index={position}
                          autoplay={false}
                          showsButtons={false}
                          showsPagination={false}
                          onIndexChanged={(page) => {
                          setPosition(page);
                          }}
                      >
                        <View>
                          {_renderForm()}
                        </View>
                        <View>

                        </View>
                        <View>
                          
                        </View>
                      </Swiper>
                        {position < 2 ?
                        <View style={{width:'100%', justifyContent: 'space-between', padding: 5, flexDirection: 'row'}}>
                          <Button
                            disabled={position==0} 
                            title='Previous' 
                            onPress={()=>{
                              setPosition(position-1)
                          }}></Button>

                          <Button title='Next' onPress={()=>{
                            setPosition(position+1)
                          }}></Button> 
                        </View>
                        :
                        <View style={{width:'100%', padding: 5, flexDirection: 'row-reverse'}}>
                          <Button title='Close' onPress={()=>{
                              props.clickHandler(false)
                              setPosition(0)
                            }}></Button>
                        </View>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    stepIndicator: {
      marginVertical: 50,
    },
    page: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      width: '100%',
      height: '100%'
    },
    stepLabel: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '500',
      color: '#999999',
    },
    stepLabelSelected: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '500',
      color: '#4aae4f',
    },
    slide1: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        width: '100%',
        height: '100%'
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
      }
  });
export default Add_del_ot_modal;
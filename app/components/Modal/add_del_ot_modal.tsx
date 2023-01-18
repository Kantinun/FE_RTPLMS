import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { ButtonGroup } from '@rneui/themed'
import { colors } from '../../config/colors';
import { Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';

function Add_del_ot_modal(props) {
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
    const _renderForm = () => {
      const [btn_group_index, setBtn_group_index] = useState(0)
      const [selected_method, setSelected_method] = React.useState("");
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
              selectedIndex={btn_group_index}
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
              containerStyle={{flex: 1}}
              inputContainerStyle={{borderWidth:1, padding: 5, borderRadius: 5}}
              // errorMessage="Oops! that's not correct."
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{textAlign: 'center'}}
              placeholder="Enter Value"
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
              placeholder="Select item"
              value={selected_method}
              dropdownPosition='bottom'
              onChange={item => {
                setSelected_method(item.value);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              // )}
            />
          </View>
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
                        customStyles={indicatorStyles}
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
    stepIndicator: {
      marginVertical: 50,
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
    },
    selectedTextStyle: {
      fontSize: 16,
      marginHorizontal: 10 
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },

  });
export default Add_del_ot_modal;
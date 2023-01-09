import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableWithoutFeedback, Button, StyleSheet, Pressable} from 'react-native';
import { Cell, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import {CheckBox, Icon} from '@rneui/themed'

const MyModal = (props: any) => {
  const tableData2 = {
    header:['','ชื่อ-นามสกุล','กำลังการผลิต'],
    content:
    [
      {
        name: 'นาย ก',
        id: 1,
        performance: '5'
      },
      {
        name: 'นาย ข',
        id: 2,
        performance: '7'
      },
      {
        name: 'นาย ค',
        id: 3,
        performance: '6'
      },
      {
        name: 'นาย ง',
        id: 4,
        performance: '8'
      },
    ]
  }

  const btn_element = () => {
    let [check, setCheck] = useState(false)
    return(
      <CheckBox
        center
        checked={check}
        onPress={() => setCheck(!check)}
      />
    )
  }

  return (
    <View style={{marginTop: 22}}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={props.visible}
        onRequestClose={() => {
          props.clickHandler(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => props.clickHandler(false)}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <TouchableWithoutFeedback>
              <View style={{backgroundColor: 'white', width: '100%'}}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                    <Row data={tableData2.header} style={styles.head} textStyle={styles.text}></Row>
                      {
                        tableData2.content.map((item)=>(
                          <TableWrapper style={{ flexDirection: 'row'}}>
                            <Cell data={btn_element()}> 
                            </Cell>
                            <Cell data={<Text style={{textAlign: 'center'}}>{item.name}</Text>}> </Cell>
                            <Cell data={<Text style={{textAlign: 'center'}}>{item.performance}</Text>}> </Cell>
                          </TableWrapper>
                        ))
                      }
                </Table>
                <Button title='Confirm'></Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#ddd' },
  text: { margin: 6, textAlign: 'center'},
})
export default MyModal;

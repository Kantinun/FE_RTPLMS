import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableWithoutFeedback, Button, StyleSheet, Pressable} from 'react-native';
import { Cell, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { SearchBar,CheckBox, Icon} from '@rneui/themed'

const MyModal = (props: any) => {
  const [data, setData] = useState(props.data)

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
        setData(newData)
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
                <SearchBar
                  placeholder='Search Here...'
                  containerStyle={{backgroundColor: 'white'}}
                  inputContainerStyle={{backgroundColor: 'white', borderWidth: 1}}
                  round={true}
                  showCancel={true}
                  lightTheme={true}
                ></SearchBar>
                <Table borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
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
                <View style={{width:'100%', flexDirection: 'row-reverse', padding: 5}}>
                  <Button title='Confirm' onPress={()=>{console.log(data.content)}}></Button>
                </View>
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

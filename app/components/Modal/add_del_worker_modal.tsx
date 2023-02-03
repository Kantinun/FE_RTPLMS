import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';
import { SearchBar,CheckBox, Button} from '@rneui/themed'
import Modal from "react-native-modal";

const Add_del_worker_modal = (props: any) => {
  const data = props.data;
  const [searchText,setSearchText] = useState('')
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

  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={() => {
        props.clickHandler(false);
      }}
    >
      <View style={{backgroundColor: 'white', width: '100%', borderRadius: 20, paddingTop: 10}}>
        <ScrollView>
        <SearchBar
            placeholder='Search Here...'
            containerStyle={{backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius:20, borderTopWidth: 0, borderBottomWidth: 0}}
            inputContainerStyle={{backgroundColor: '#eeee'}}
            round={true}
            lightTheme={true}
            value={searchText}
            onChange={(text)=>{setSearchText(text)}}
          ></SearchBar>
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
          <View style={{width:'100%', flexDirection: 'row-reverse', padding: 15}}>
            <Button title='Confirm' 
              containerStyle={styles.footer_btn}
              onPress={()=> props.handleConfirm(props.mode)}></Button>
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
  }
})
export default Add_del_worker_modal;

import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableWithoutFeedback, Button} from 'react-native';

const MyModal = (props: any) => {

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
              <View style={{backgroundColor: 'white', padding: 22}}>
                <Button title="test"/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MyModal;

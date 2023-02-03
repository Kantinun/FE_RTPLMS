import { Tab } from '@rneui/base';
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appcontext} from '../../../AppContext'
import { Icon } from '@rneui/themed';

const Stack = createNativeStackNavigator();

const FirstComponent = () => (
    <View style={{backgroundColor: 'green', flex: 1}}></View>
)
function LogScreen(props) {
    let {state,authContext} = useContext(Appcontext)
    return (
        // <View style={{backgroundColor:'green', flex: 1}}>

        // </View>
        <Stack.Navigator
        screenOptions={{
            headerRight: () =>(
              <TouchableOpacity style={{marginRight:15}} onPress={authContext.signOut}>
                <Icon name='log-out-outline' type='ionicon'></Icon>
              </TouchableOpacity>
            ),
          }}
        >
            <Stack.Screen
                name='Log'
                component={FirstComponent}
            />
        </Stack.Navigator>
    );
}

export default LogScreen;
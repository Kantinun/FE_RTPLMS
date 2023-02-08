import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { Appcontext } from '../../AppContext';
import { colors } from '../config/colors';

const Stack = createNativeStackNavigator();

const _renderProfileContext = ()=>{
  const mockupData = {account_id:1,name:'krissana Jongtumdee',phoneNumber:'091-234-5678', role:'Manager', performance: '10', username: 'krissana123'}
  return(
    <>
    <View style={{height: '20%', backgroundColor: colors.primary, justifyContent: 'flex-start',alignItems: 'center'}}>
      <Avatar
            size='xlarge'
            rounded
            icon={{name:'account' ,type:'material-community', color: 'grey',}}
            iconStyle={{borderColor: '#aaaf', borderWidth: 1, borderRadius: 50, backgroundColor:'white'}}
            containerStyle={{paddingBottom: 10}}
          />
    </View>
    <View style={{flex:1, alignItems:'center',}}>
      <View style={{
        backgroundColor: 'white', 
        width: '80%', 
        height: '40%', 
        marginTop: 10, 
        borderRadius: 20, 
        elevation:10, 
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        shadowOpacity: .3
      }}>
        <View style={{alignItems:'center', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 10}}>
          <Text style={{fontSize: 25, marginTop: 5}}>{mockupData.name}</Text>
          <Text style={{fontSize: 15, color: '#aaa'}}>{mockupData.username}</Text>
        </View>
        <View style={{marginTop:20, flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{fontSize: 20}}>{`Role: ${mockupData.role}`}</Text> */}
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, color:'#555a'}}>Role:</Text>
            <Text style={{fontSize: 20, color:'#555a'}}>Phone number:</Text>
            <Text style={{fontSize: 20, color:'#555a'}}>Performance:</Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize:17}}>{mockupData.role}</Text>
            <Text style={{fontSize:17}}>{mockupData.phoneNumber}</Text>
            <Text style={{fontSize:17}}>{mockupData.performance}</Text>
          </View>
        </View>
      </View>
    </View>
    </>
  )
}

const ProfileScreen = ({navigation, route}: any) => {
  let {state,authContext} = React.useContext(Appcontext)
  
  return (
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
                name='Profile'
                component={_renderProfileContext}
            />
        </Stack.Navigator>
  );
};

export default ProfileScreen;

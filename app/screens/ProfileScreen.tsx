import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { Appcontext } from '../../AppContext';
import { colors } from '../config/colors';
import { AccountProfile, fetchAccountData, initAccountProfile } from '../services/account.service';

const Stack = createNativeStackNavigator();

const _renderProfileContext = ()=>{
  // Mockup data
  // const data = {account_id:1,name:'krissana Jongtumdee',telephone:'091-234-5678', role:'Manager', performance: '10', username: 'krissana123'}

  // =============================================================
  // Fetch account data
  const [data, setData] = useState<AccountProfile>(initAccountProfile);
  const {state} = useContext(Appcontext);
  const accountData = fetchAccountData(state.data.id);

  const setAccountData = () => {
    accountData.then(res=>{
      setData(res);
    })
  }

  useEffect(setAccountData,[]);
// =============================================================
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
          <Text style={{fontSize: 25, marginTop: 5}}>{data.fullname}</Text>
          <Text style={{fontSize: 15, color: '#aaa'}}>{data.username}</Text>
        </View>
        <View style={{marginTop:20, flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{fontSize: 20}}>{`Role: ${data.role}`}</Text> */}
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, color:'#555a'}}>Role:</Text>
            <Text style={{fontSize: 20, color:'#555a'}}>Phone number:</Text>
            <Text style={{fontSize: 20, color:'#555a'}}>Performance:</Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize:17}}>{data.role}</Text>
            <Text style={{fontSize:17}}>{data.telephone}</Text>
            <Text style={{fontSize:17}}>{data.performance}</Text>
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

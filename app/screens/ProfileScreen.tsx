import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { Appcontext } from '../../AppContext';
import { colors } from '../config/colors';
import { useState } from 'react';
import { getAccountDetails } from '../services/account.service';

const Stack = createNativeStackNavigator();

interface AccountDetails {
  account_id: string;
  details: Object;
  fullname: string;
  mng_id: string;
  password: string
  performance: string;
  role: string;
  telephone: string;
  username: string;
}

const ProfileScreen = ({navigation, route}: any) => {
  let {state,authContext} = React.useContext(Appcontext)
  const [data, setData] = useState<AccountDetails>({} as AccountDetails)
  
  React.useEffect(() => {
    getAccountDetails(state.data.id).then((res)=>{
      setData(res)
    })
  }, []);

  const _renderProfileContext = ()=>{
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
            <Text style={{fontSize: 25, marginTop: 5}}>{data.fullname? data.fullname:'-'}</Text>
            <Text style={{fontSize: 15, color: '#aaa'}}>@{data.username? data.username:'-'}</Text>
          </View>
          <View style={{marginTop:5, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 20, color:'#555a'}}>Role:</Text>
              <Text style={{fontSize: 20, color:'#555a'}}>Phone number:</Text>
              <Text style={{fontSize: 20, color:'#555a'}}>Performance:</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize:17}}>{data.role? data.role: '-'}</Text>
              <Text style={{fontSize:17}}>{data.telephone? data.telephone: '-'}</Text>
              <Text style={{fontSize:17}}>{data.performance? data.performance: '-'}</Text>
            </View>
          </View>
        </View>
      </View>
      </>
    )
  }
  
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

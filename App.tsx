import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './app/screens/Manager/DashboardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DetailScreen from './app/screens/Manager/DetailScreen';
import TaskPlanScreen from './app/screens/Worker/TaskPlanScreen';
import OTrequestScreen from './app/screens/Worker/OTrequestScreen';
import MyLoginScreen from './app/screens/LoginScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { View,Text } from 'react-native';

const App = () => {
  const [userRole, setUserRole] = React.useState('') 
  const ManagerScreen =()=> {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{title: 'Dashboard'}}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen 
            name="Detail"
            component={DetailScreen}
            options={{title: 'Details'}}
          />
        </Stack.Navigator>
    );
  }
  
  return (
    userRole==''?
    <MyLoginScreen loginHandler={setUserRole}></MyLoginScreen>
    :
    <NavigationContainer>
      {userRole==='worker'?
      <Tab.Navigator>
          <Tab.Screen 
            options={{
              headerShown: false,
            }}
            name="Tasks Plan" component={TaskPlanScreen} />
          <Tab.Screen
            name="OT Requests" component={OTrequestScreen} />
      </Tab.Navigator>
      :
      <Tab.Navigator>
          <Tab.Screen 
            options={{
              headerShown: false,
            }}
            name="Home" component={ManagerScreen} />
          {/* <Tab.Screen
            name="Profile" component={TaskPlanScreen} /> */}
      </Tab.Navigator>
      }
    </NavigationContainer>
  );
};
export default App;

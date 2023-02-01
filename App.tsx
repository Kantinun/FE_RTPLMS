import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './app/screens/Manager/DashboardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DetailScreen from './app/screens/Manager/DetailScreen';
import TaskPlanScreen from './app/screens/Worker/TaskPlanScreen';
import OTrequestScreen from './app/screens/Worker/OTrequestScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { View,Text } from 'react-native';

const App = () => {
  const HomeScreen=()=> {
    return (
        <Stack.Navigator initialRouteName="TaskPlan">
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
          <Stack.Screen
            name="TaskPlan"
            component={TaskPlanScreen}
            options={{title: 'Tasks Plan'}}
          />
        </Stack.Navigator>
    );
  }
  
  const SettingsScreen=()=> {
    return (
      <OTrequestScreen></OTrequestScreen>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen 
            options={{
              headerShown: false,
            }}
            name="Home" component={HomeScreen} />
          <Tab.Screen
            // options={{
            //   headerShown: false,
            // }} 
            name="OT Requests" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;

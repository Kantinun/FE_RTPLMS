import React, { useState, useReducer, useContext, createContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './app/screens/Manager/DashboardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DetailScreen from './app/screens/Manager/DetailScreen';
import TaskPlanScreen from './app/screens/Worker/TaskPlanScreen';
import OTrequestScreen from './app/screens/Worker/OTrequestScreen';
import LogScreen from './app/screens/Manager/LogScreen';
import { RootSiblingParent } from 'react-native-root-siblings';
import MyLoginScreen from './app/screens/LoginScreen';
import { Appcontext } from './AppContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//in normal them use secureStore to store token from server that will recieve after authentication
import * as SecureStore from 'expo-secure-store';

import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { Account } from './app/services/account.service';

export interface Action {
  type: 'LOGIN' | 'LOGOUT';
  data?: Account;
}
export interface State {
  isAuthenticated: boolean;
  data?: Account;
}
const initialState: State = {
  isAuthenticated: false,
  data: {id:'',role:''}
}
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, data: action.data};
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const authContext = React.useMemo(
    () => ({
      signIn: async (data: Account) => {
        dispatch({ type: 'LOGIN', data: data})
      },
      signOut: () => dispatch({ type: 'LOGOUT'}),
    }),
    []
  );
  const MainpageManager = () => {
    return(
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
          name="MainPage"
          component={DashboardScreen}
          options={{title: 'Dashboard'}}
        />
        <Stack.Screen 
          name="Detail"
          component={DetailScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    )
  }
  const ManagerScreen = ()=>{
    return(
      <Tab.Navigator
        initialRouteName='Dashboard'
        screenOptions={{
          headerShown:false
        }}
      >
          <Tab.Screen
            name="Logs" component={LogScreen}
            options={{
              tabBarIcon: () => (
                <Icon name='history' type='material-icon'></Icon>
                )
              }}
             
          />
          <Tab.Screen 
            name="Dashboard" component={MainpageManager} 
            options={{
              tabBarIcon: () => (
                <Icon name='dashboard' type='material-icon'></Icon>
              )
            }}
          />
          <Tab.Screen
            name="ProfileScreen" component={ProfileScreen} 
            options={{
              tabBarIcon: () => (
                <Icon name='account-circle' type='material-community'></Icon>
              )
            }}
          />
      </Tab.Navigator>
    )
  }
  const WorkerScreen = ()=>{
    return(
      <Tab.Navigator
        initialRouteName='Tasks Plan'
        screenOptions={{
          headerRight: () =>(
            <TouchableOpacity style={{marginRight:15}} onPress={authContext.signOut}>
              <Icon name='log-out-outline' type='ionicon'></Icon>
            </TouchableOpacity>
          ),
        }}
      >
          <Tab.Screen
            name="OT Requests" component={OTrequestScreen} 
            options={{
              tabBarIcon: () => (
                <Icon name='clipboard-clock' type='material-community'></Icon>
                )
              }}  
          />
          <Tab.Screen 
            name="Tasks Plan" component={TaskPlanScreen} 
            options={{
              tabBarIcon: () => (
                <Icon name='clipboard-text-multiple' type='material-community'></Icon>
              )
            }}
          />
          <Tab.Screen
            name="ProfileScreen" component={ProfileScreen} 
            options={{
              headerShown:false,
              tabBarIcon: () => (
                <Icon name='account-circle' type='material-community'></Icon>
              )
            }}
          />
      </Tab.Navigator>
    )
  }
  const LoginScreen = () => (
      <MyLoginScreen testID='t-login'/>
  )
  
  return (
    <RootSiblingParent>
    <Appcontext.Provider value={{state,authContext}}>
      <NavigationContainer>
        <Stack.Navigator
        >
          {
            state.isAuthenticated?
              state.data?.role == 'manager'?
              <Stack.Screen
              name="Manager"
              component={ManagerScreen}
              options={{title: 'Dashboard',headerShown: false}}
              />
              :
              <Stack.Screen
                name="Worker"
                component={WorkerScreen}
                options={{
                  headerShown: false
                }}
              />
            :
            <Stack.Screen 
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: !state.isAuthenticated ? 'pop' : 'push',
              }}
            />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Appcontext.Provider>
    </RootSiblingParent>
  );
};
export default App;

import React, { useState, useReducer, useContext, createContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './app/screens/Manager/DashboardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DetailScreen from './app/screens/Manager/DetailScreen';
import TaskPlanScreen from './app/screens/Worker/TaskPlanScreen';
import OTrequestScreen from './app/screens/Worker/OTrequestScreen';

import MyLoginScreen from './app/screens/LoginScreen';

import { Appcontext } from './AppContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

interface Action {
  type: 'LOGIN' | 'LOGOUT'
}
interface State {
  isAuthenticated: boolean;
  role: string;
}
const initialState = {
  isAuthenticated: false,
  role: ''
}
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, role: action.role};
    case 'LOGOUT':
      return { isAuthenticated: false, role: ''};
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'LOGIN', role: data.role})
      },
      signOut: () => dispatch({ type: 'LOGOUT'}),
      // signUp: async (data) => {
  
      //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      // },
    }),
    []
  );
  const WorkerScreen = ()=>{
    return(
      <Tab.Navigator
        screenOptions={{
          headerRight: () =>(
            <TouchableOpacity style={{marginRight:15}} onPress={authContext.signOut}>
              <Icon name='log-out-outline' type='ionicon'></Icon>
            </TouchableOpacity>
          ),
        }}
      >
          <Tab.Screen 
            name="Tasks Plan" component={TaskPlanScreen} />
          <Tab.Screen
            name="OT Requests" component={OTrequestScreen} />
          <Tab.Screen
          name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }
  const LoginScreen = () => (
      <MyLoginScreen tmp={authContext}/>
  )
  
  return (
    <Appcontext.Provider value={state}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: () =>( state.isAuthenticated &&
              <TouchableOpacity onPress={authContext.signOut}>
                <Icon name='log-out-outline' type='ionicon'></Icon>
              </TouchableOpacity>
            ),
          }}
        >
          {
            state.isAuthenticated?
              state.role == 'manager'?
              <>
              <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{title: 'Dashboard'}}
              />
              <Stack.Screen 
                name="Detail"
                component={DetailScreen}
                options={{title: 'Details'}}
              />
              </>
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
                // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Appcontext.Provider>
  );
};
export default App;

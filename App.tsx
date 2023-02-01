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

const App = () => {
  const [userRole, setUserRole] = React.useState('') 
  
  const WorkerScreen = ()=>{
    return(
      <Tab.Navigator>
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
    <MyLoginScreen loginHandler={setUserRole}/>
  )
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          userRole != ''?
            userRole == 'manager'?
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
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

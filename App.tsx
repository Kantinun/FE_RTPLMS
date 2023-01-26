import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './app/screens/Manager/DashboardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DetailScreen from './app/screens/Manager/DetailScreen';
import WokerDashboard from './app/screens/Worker/WokerDashboard';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="WorkerDashboard"
          component={WokerDashboard}
          options={{title: 'Dashboard'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

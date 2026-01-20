import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="MainApp" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login';
import Register from './Register';

const Authenstack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen component={Login} name='Login' />
        <Stack.Screen component={Register} name='Register' />
    </Stack.Navigator>
  )
}

export default Authenstack
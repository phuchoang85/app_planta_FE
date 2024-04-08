import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Bottomstack from '../bottom/Bottomstack';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import PayPage from './PayPage';
import PayPageSubmit from './PayPageSubmit';
import NotifiPage from './NotifiPage';
import Editinformation from './Editinformation';
import Transactionhistory from './Transactionhistory';
import PlantGrowingGuide from './PlantGrowingGuide';
import Catalog from './Catalog';

const Stacknavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Bottomstack} name='Bottomstack'/>
      <Stack.Screen component={ProductDetail} name='ProductDetail'/>
      <Stack.Screen component={Cart} name='Cart'/>
      <Stack.Screen component={PayPage} name='PayPage'/>
      <Stack.Screen component={PayPageSubmit} name='PayPageSubmit'/>
      <Stack.Screen component={NotifiPage} name='NotifiPage'/>
      <Stack.Screen component={Editinformation} name='Editinformation'/>
      <Stack.Screen component={Transactionhistory} name='Transactionhistory'/>
      <Stack.Screen component={PlantGrowingGuide} name='PlantGrowingGuide'/>
      <Stack.Screen component={Catalog} name='Catalog'/>
    </Stack.Navigator>
  )
}

export default Stacknavigation
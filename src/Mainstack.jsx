import React, { useContext } from 'react'
import Authenstack from './authen/Authenstack';
import Stacknavigation from './stack/Stacknavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Mainstack = () => {
  const appReducer = useSelector((state) => state.user)
  return (
    <NavigationContainer>
      {appReducer.user ? <Stacknavigation/> : <Authenstack/> }
    </NavigationContainer>
  )
}

export default Mainstack
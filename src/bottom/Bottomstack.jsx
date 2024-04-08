import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Search from './Search';
import Notification from './Notification';
import User from './User';

const Bottomstack = () => {
  const Bottom = createBottomTabNavigator();

  const renderItem = (nameIcon,focused) =>{
    return(
      <View style={{alignItems: 'center'}}>
      <Image
        style={{width: 24, height: 24, marginBottom: 6}}
        source={nameIcon}
        resizeMode='contain' />
      {focused && <Image source={require('../../resources/images/dot.png')}/>}
    </View>
    );
  };

  return (
    <Bottom.Navigator
     screenOptions={{
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarStyle: [
        {
          flexDirection:'row',
          height: 60,
          borderColor: 'white',
          paddingHorizontal: 30,
        },
      ],
     }}>

      <Bottom.Screen component={Home} name='Home'
      options={{
        tabBarIcon:({focused}) =>(
          renderItem(require('../../resources/images/home.png'),focused)
        )
      }}/>

<Bottom.Screen component={Search} name='Search'
      options={{
        tabBarIcon:({focused}) =>(
          renderItem(require('../../resources/images/search.png'),focused)
        )
      }}/>

<Bottom.Screen component={Notification} name='Notification'
      options={{
        tabBarIcon:({focused}) =>(
          renderItem(require('../../resources/images/notification.png'),focused)
        )
      }}/>

<Bottom.Screen component={User} name='User'
      options={{
        tabBarIcon:({focused}) =>(
          renderItem(require('../../resources/images/user.png'),focused)
        )
      }}/>
    </Bottom.Navigator>
  )
}

export default Bottomstack
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const AppButtonImage = (props) => {
    const {styleimg, img,stylebutton,event} = props
  return (
    <View>
      <TouchableOpacity
      onPress={event}
      style={stylebutton}>
        <Image style={styleimg} source={img}/>
      </TouchableOpacity>
    </View>
  )
}

export default AppButtonImage
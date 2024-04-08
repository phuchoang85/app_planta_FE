import { View, Text, Image } from 'react-native'
import React from 'react'

const AppImage = (props) => {
  const {img, styles} = props
  return (
    <Image source={img} style={styles}/>
  )
}

export default AppImage
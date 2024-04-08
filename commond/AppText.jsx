import { View, Text } from 'react-native'
import React from 'react'

const AppText = (props) => {
    const {text, styles} = props
  return (
    <Text style={styles}>{text}</Text>
  )
}

export default AppText
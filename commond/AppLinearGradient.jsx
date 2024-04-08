import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const AppLinearGradient = (props) => {
    const {children, listcolor, styles, start, end} = props 
  return (
    <LinearGradient
    start={start}
    end={end}
    colors={listcolor}
    style={styles}>
        {children}
    </LinearGradient>
  )
}

export default AppLinearGradient
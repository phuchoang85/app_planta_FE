import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AppTextUnderLine = (props) => {
    const {textLeft,textRight,styleLeft,styleRight} = props
  return (
    <View style={style.container}>
      {textLeft? <Text style={styleLeft}>{textLeft}</Text> : <View></View>}
      {textRight? <Text style={styleRight}>{textRight}</Text>: <View></View>}
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        borderBottomColor:'black',
        borderBottomWidth: 1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop: 15
    }
})

export default AppTextUnderLine
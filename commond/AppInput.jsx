import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import Appbutton from './Appbutton'
const AppInput = (props) => {
  const { placeholder, value, setvalue, eror, styles, styleError, entrypassword } = props
  return (
    <View>
      <TextInput
        style={styles}
        value={value}
        placeholder={placeholder}
        onChangeText={text => setvalue(text)}
        secureTextEntry = {entrypassword}
      />
      {eror &&
        <Text style={styleError}>
          {eror}
        </Text>}

    </View>
  )
}

export default AppInput
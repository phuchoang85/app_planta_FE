import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './AppStyles'


const AppInputUnderLine = (props) => {
  const { placeholder, value, setvalue, eror, eventEndEdit, click, secureTextEntry,type } = props
  const [isfocus, setisfocus] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (eror.trim()) {
      ref.current.focus();
    }
  }, [click])

  const endEdit = () =>{
    eventEndEdit()
  }

  return (
    <View>
      <View style={[style.underline, {
        borderBottomColor: isfocus ? 'black' : '#ABABAB',
      }]}>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={text => setvalue(text)}
          style={[style.textinput, { textDecorationLine: value ? 'underline' : 'none' }]}
          onFocus={() => setisfocus(true)}
          onBlur={() => setisfocus(false)}
          onSubmitEditing={() => endEdit()}
          secureTextEntry={!secureTextEntry ? false: secureTextEntry}
          keyboardType={type ? 'numeric': 'default'}
        />
      </View>
      {eror && <Text style={style.textErro}>{eror} </Text>}
    </View>

  )
}

const style = StyleSheet.create({
  textErro: {
    ...styles.font2,
    fontSize: 14,
    lineHeight: 22,
    color: 'red',
  },
  underline: {
    borderBottomWidth: 1,
    height: 45,
  },
  textinput: {
    ...styles.font2,
    fontSize: 14,
    width: '100%',
    color: 'black',
    position: 'absolute',
    bottom: -10,
  }
})

export default AppInputUnderLine
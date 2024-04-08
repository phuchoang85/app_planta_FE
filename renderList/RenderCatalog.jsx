import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../commond/AppStyles'

const RenderCatalog = (props) => {
  const { item, select, setselect, eventGetData } = props
  return (
    <TouchableOpacity
      onPress={async () => {
        await setselect(item._id);
        if (item._id == 1 || item._id == 2)
          await eventGetData(item.title)
        else
          await eventGetData(item._id)
      }}
      style={[style.container, { backgroundColor: select == item._id ? '#009245' : 'white' }]}>
      <Text style={[{ color: select == item._id ? 'white' : '#7D7B7B' }]}>{item.title}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    ...styles.font2,
    lineHeight: 20
  },
  container: {
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8
  }
})
export default RenderCatalog
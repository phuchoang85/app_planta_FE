import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../commond/AppStyles'


const RenderProductHome = (props) => {
  const { item, navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { data: item._id, type: 'product' })}
      style={{ width: '42%', margin: 15 }}>
      <Image style={style.containerImage} source={{ uri: item.imgs[0].img }} />
      {item.name && <Text style={style.textNamePr}>{item.name}</Text>}
      {item.prototy.length > 0 && <Text style={style.textproperties}>{item.prototy[0].title}</Text>}
      {item.price && <Text style={style.textprice}>{item.price} đ</Text>}
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  containerImage: {
    width: '100%',
    height: 134,
    backgroundColor: '#d2d4d2',
    borderRadius: 8,
    alignSelf: 'center'
  },
  textNamePr: {
    ...styles.font2,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
  textproperties: {
    ...styles.font2,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#7D7B7B'
  },
  textprice: {
    ...styles.font2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007537'
  }
});

export default RenderProductHome
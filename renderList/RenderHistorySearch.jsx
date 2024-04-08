import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../commond/AppStyles'
import AppButtonImage from '../commond/AppButtonImage'
import product from '../filedata/product.json'

const RenderHistorySearch = (props) => {
  const { item, setsearch, setdatapro } = props;

  const findProduct = (text, data) => {
    return data.filter(item => item.name.includes(text));
  }

  return (
    <TouchableOpacity
      style={style.container} onPress={() => {
        setsearch(item.name);
        setdatapro(findProduct(item.name, product))
      }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Image style={style.img} source={require('../resources/images/historySearch.jpg')} />
        <Text style={style.text}>{item.name}</Text>
      </View>
      <AppButtonImage
        styleimg={style.img}
        img={require('../resources/images/close.jpg')}
        stylebutton={{}}
        event={{}}
      />
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
  text: {
    ...styles.font2,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  img: {
    width: 20,
    height: 20
  },
  container: {
    width: '100%',
    height: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 19
  }
})

export default RenderHistorySearch

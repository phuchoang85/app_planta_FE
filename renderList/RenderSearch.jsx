import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../commond/AppStyles'
import catalog from '../filedata/catalogs.json'

const RenderSearch = (props) => {
  const { item, navigation, type } = props

  const  pr = item?.product ? item.product : item;
  // Search và Notification và các trang còn lại chỉ là hiển thị 
  return (
    <TouchableOpacity
      onPress={() => type == "Search" ? navigation.navigate('ProductDetail', { data: pr._id, type: 'product' }) : 
          type == "Guide" ? navigation.navigate('ProductDetail', { data: pr._id, type: 'guide' }) :
           console.log('hehe')}

      style={style.container}>
      <Image style={style.img} source={{ uri: pr.imgs[0].img }} />
      <View style={{ flex: 1}}>
        {type === "Notification" && <Text style={[style.text, { fontSize: 16, color: item.isSucces === "Đã giao thành công" ? 'green' : 'red' }]}>{item.isSucces}</Text>}
       
        <View style={style.containername}>
          <Text numberOfLines={1} style={[style.text, { fontSize: 16, flex: 6 }]}>{pr.name}</Text>
        </View>

        {/* {type === "Guide" && <Text style = {[style.text, { fontSize: 14, color: '#7D7B7B' }]}>Độ khó {pr.lever}</Text>} */}
        {type !== "Notification" && type !== "Guide" && <Text style={[style.text, { fontSize: 16 }]}>{pr.price}đ</Text>}
        {type !== "Guide" && <Text style={[style.text, { fontSize: 14 }]}>{type == 'Search' ? ('Còn ' + pr.quantity + ' sp') : (item.count + " sản phẩm")}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  containername: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    ...styles.font2,
    fontWeight: 'bold',
    lineHeight: 22,
    color: 'black'
  },
  img: {
    width: 77,
    height: 77,
    borderRadius: 8,
    marginRight: 15
  },
  container: {
    height: 107,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems:'center'
  }
})
export default RenderSearch

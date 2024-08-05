import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '../../commond/AppStyles'
import Header from '../stack/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import notifidata from '../../filedata/notifidata.json'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import RenderDateNotifi from '../../renderList/RenderDateNotifi'
import OrderApi from '../../api/OrderApi'
import { useSelector } from 'react-redux'

const Notification = () => {
  const navigation = useNavigation();
  const userStore = useSelector((state) => state.user);
  const [dataorder, setdataorder] = useState([])

  const getdataorder = async () => {
    const body = {
      id: userStore.user._id,
    }

    const result = await OrderApi.getOrder(body);
    if (result.status) {
      setdataorder([...dataorder, ...result.data]);
    } else {
      console.log(result.data)
      Alert.alert('Lỗi');
    }
  }


  useFocusEffect(useCallback(() => {
    getdataorder()
  }, []))

  return (
    <View style={style.container}>
      <Header
        iconLeft={require('../../resources/images/arrowleft.jpg')}
        title={'Thông báo'}
        eventLeft={() => { }}
      />

      <ScrollView
        style={style.containerscrollview}
      >
        <AppFlatListProductHome
          data={dataorder}
          number={1}
          renderitem={({ item }) =>
            <RenderDateNotifi item={item} navigation={navigation} />}
        />
      </ScrollView>

    </View>
  )
}

const style = StyleSheet.create({
  containerscrollview: {
    paddingHorizontal: 48
  },
  container: {
    flex: 1,
    ...styles.backgroundAll
  }
})

export default Notification
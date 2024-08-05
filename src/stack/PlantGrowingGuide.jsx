import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '../../commond/AppStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Header from './Header'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import RenderSearch from '../../renderList/RenderSearch'
import ProductApi from '../../api/ProductApi'
const PlantGrowingGuide = () => {

  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);

  const getprodcut = async (page) => {
    const body = {
      limit: 8,
      page: page,
    }
    const result = await ProductApi.getProduct(body);

    if (result.status) {
      setdata([...data, ...result.data]);
    } else {
      Alert.alert("lỗi")
    }
  }

  const handleScroll = async (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const { height } = event.nativeEvent.layoutMeasurement;
    const contentSize = event.nativeEvent.contentSize.height;

    if (height + y >= contentSize - 50) {
      setpage(page + 1);
      await getprodcut(page + 1);
    }

  };

  useFocusEffect(useCallback(() => {
    getprodcut(page)
  }, []))


  return (
    <View style={style.container}>
      <Header
        iconLeft={require('../../resources/images/arrowLeft.jpg')}
        title={'CÁCH BẢO QUẢN GỐM'}
        eventLeft={() => navigation.navigate('User')}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={style.containerBody}>
        <AppFlatListProductHome
          data={data}
          number={1}
          renderitem={({ item }) => <RenderSearch
            item={item}
            navigation={navigation}
            type={'Guide'} />}
        />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...styles.backgroundAll,
    flex: 1
  },
  containerBody: {
    paddingHorizontal: 48
  }
})

export default PlantGrowingGuide
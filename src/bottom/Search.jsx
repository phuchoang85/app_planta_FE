import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../stack/Header'
import AppSearch from '../../commond/AppSearch'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import Renderhistorysearch from '../../renderList/Renderhistorysearch'
import styles from '../../commond/AppStyles'
import { useNavigation } from '@react-navigation/native'
import RenderSearch from '../../renderList/RenderSearch'
import ProductApi from '../../api/ProductApi'
const Search = () => {



  const historysearch = [
    
  ];

  const navigation = useNavigation();
  const [search, setsearch] = useState('')
  const [page, setpage] = useState(1)
  const [isFocus, setisFocus] = useState(false);

  const [datapro, setdatapro] = useState(historysearch);

  const renderitem = ({ item }) => {
    return (
      item.price ? <RenderSearch item={item} navigation={navigation} type={'Search'} /> :
        <Renderhistorysearch item={item} setsearch={setsearch} setdatapro={setdatapro} />
    )
  }

  const SearchProduct = async (text, page) => {
    if (text) {
      const body = {
        limit: 8,
        page: page,
        key: text
      }
      const result = await ProductApi.getProductWithKey(body);

      if (page == 1 && result.status) {
        setdatapro(result.data)
      }
      else if (result.status) {
        setdatapro([...datapro, ...result.data]);
      } else {
        Alert.alert("lỗi")
      }
    }
  }


  const handleScroll = async (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const { height } = event.nativeEvent.layoutMeasurement;
    const contentSize = event.nativeEvent.contentSize.height;

    if (height + y >= contentSize - 50 && datapro[0].price) {
      setpage(page + 1);
      await SearchProduct(search, page + 1);
    }

  };

  return (
    <View style={style.container}>
      <Header
        iconLeft={require('../../resources/images/arrowleft.jpg')}
        title={'Tìm kiếm'}
        iconRight={null}
        eventLeft={() => console.log("left")}
        eventRight={() => console.log("right")} />

      <View style={style.bodycontainer} >
        <AppSearch
          img={require('../../resources/images/search.png')}
          placeholder={'Tìm kiếm'}
          value={search}
          setvalue={setsearch}
          setisFocus={setisFocus}
          setpage={setpage}
          SearchProduct={SearchProduct}
          setdatapro={setdatapro}
        />

        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <AppFlatListProductHome
            styletitle={style.titlettext}
            data={datapro}
            title={datapro.length == 0 ? null : datapro[0].time ? 'Tìm kiếm gần đây' : null}
            number={1}
            textEmpty={'Không tìm thấy'}
            renderitem={renderitem}
          />
          <View style={{ height: 100 }} />
        </ScrollView>



      </View>
    </View>
  )
}

const style = StyleSheet.create({
  titlettext: {
    ...styles.font2,
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    ...styles.backgroundAll
  },
  bodycontainer: {
    ...styles.backgroundAll,
    paddingHorizontal: 24,
  }
})

export default Search
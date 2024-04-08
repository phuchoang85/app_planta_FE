import { View, Text, StyleSheet, ScrollView, Image, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../commond/AppStyles'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import product from '../../filedata/product.json'
import RenderProductHome from '../../renderList/RenderProductHome'
import RenderSingleHome from '../../renderList/RenderSingleHome'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Appbutton from '../../commond/Appbutton'
import AppButtonImage from '../../commond/AppButtonImage'
import CatalogApi from '../../api/CatalogApi'
const Home = () => {
  const catalogshow1 = "65f2701ba8e73ff8f9b70bd8"
  const catalogshow2 = "65f27024a8e73ff8f9b70bda"
  const catalogshow3 = "65f59ebf98d771d9f5a4df2d"


  const [data, setdata] = useState(product)
  const [catalog1, setcatalog1] = useState([])
  const [catalog2, setcatalog2] = useState([])
  const [catalog3, setcatalog3] = useState([])

  const navigation = useNavigation();

  const getCatalog = async (id, set) => {
    const data = {
      limit: 4,
      page: 1,
      id: id
    }

    const result = await CatalogApi.getOneCatalog(data);
    if (result.status) {
      set(result.data.products)
    } else {
      console.log(result.data)
    }

  }

  const ham = async () => {
    await getCatalog(catalogshow1, setcatalog1);
    await getCatalog(catalogshow2, setcatalog2);
    await getCatalog(catalogshow3, setcatalog3);
  }

  useFocusEffect(useCallback(() => {
    ham();
  }, []))


  const animatedValue = useRef(new Animated.Value(0)).current;

  const opacityviewAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 280],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    }),
  }

  const depositdownAnimation = {

    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 280],
          outputRange: [0, 200], // Adjust this value as needed
          extrapolate: 'clamp'
        })
      }
    ]
  }

  const fontAnimation = {
    fontSize: animatedValue.interpolate({
      inputRange: [0, 280],
      outputRange: [24, 16],
      extrapolate: 'clamp'
    }),
  }

  const depositviewAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 280],
          outputRange: [0, -200], // Adjust this value as needed
          extrapolate: 'clamp'
        })
      }
    ]
  }
  return (
    <View style={style.container}>

      <View style={{ height: 120 }}>

      </View>

      <Animated.View style={[depositviewAnimation, style.mainContainer]}>

        <Animated.View style={[depositdownAnimation, style.containerdoc]}>
          <Animated.Text style={[fontAnimation, style.textTilte]}>
            Planta - toả sáng không gian nhà bạn
          </Animated.Text>


          <AppButtonImage
            styleimg={{}}
            img={require('../../resources/images/cart.png')}
            stylebutton={style.containerImageCart}
            event={() => navigation.navigate('Cart')}
          />
        </Animated.View>

        <Animated.View style={opacityviewAnimation}>
          <Appbutton
            text={'Xem hàng mới về ->'}
            styles={{ width: '50%' }}
            event={() => { }}
            stylettext={style.textClick}
          />
        </Animated.View>


        <Animated.Image style={
          [opacityviewAnimation
            , { width: '100%', height: 205, position: 'absolute', top: 70, right: 0, zIndex: -1 }]
        } source={require('../../resources/images/bonsai.png')} />

      </Animated.View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
        style={{ backgroundColor: 'white', paddingHorizontal: 24 }}>

        <View style={{ height: 150, }}>

        </View>

        <AppFlatListProductHome
          data={catalog1}
          setdata={setcatalog1}
          title={'Cây trồng'}
          navigation={navigation}
          number={2}
          more={true}
          idcatalog={catalogshow1}
          renderitem={({ item }) => <RenderProductHome item={item} navigation={navigation} />} />

        <AppFlatListProductHome
          data={catalog2}
          title={'Chậu cây trồng'}
          number={2}
          more={true}
          navigation={navigation}
          idcatalog={catalogshow2}
          renderitem={({ item }) => <RenderProductHome item={item} navigation={navigation} />}
          setdata={setdata} />

        <AppFlatListProductHome
          data={catalog3}
          title={'Vật trang trí cây trồng'}
          number={2}
          more={true}
          navigation={navigation}
          idcatalog={catalogshow3}
          renderitem={({ item }) => <RenderProductHome item={item} navigation={navigation} />}
          setdata={setdata} />

        <AppFlatListProductHome
          data={catalog3}
          title={'Combo chăm sóc (mới)'}
          number={1}
          more={true}
          idcatalog={catalogshow3}
          navigation={navigation}
          renderitem={
            ({ item }) => <RenderSingleHome item={item} navigation={navigation} />}
          setdata={setdata} />

        <View style={style.paddingBottom}></View>
      </ScrollView>


    </View>
  )
}

const style = StyleSheet.create({
  paddingBottom: {
    height: 50
  },
  textClick: {
    ...styles.font2,
    color: '#007537',
    fontSize: 16,
    lineHeight: 22,
  },
  containerImageCart: {
    width: 48,
    height: 48,
    borderRadius: 360,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerdoc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTilte: {
    ...styles.font2,
    fontWeight: '500',
    width: '60%',
    flexWrap: 'wrap',
    fontSize: 24,
    color: 'black',
    lineHeight: 37,
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    width: '100%',
    padding: 25,
    height: 275,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    zIndex: 1,
    top: 0
  }
})
export default Home
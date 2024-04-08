import { View, Text, Image, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import Swiper from 'react-native-swiper'

const AppSwiper = (props) => {
  const { data } = props

    const ButtonSwiper = (img) => {
      return (
        <View style={{width: 24, height: 24, justifyContent:'center', alignItems:'center'}}>
          <Image style={{width: '100%', height: '100%', borderRadius: 90  }} source={img}/>
        </View>
      )
  }

  return (
    <View style={{width: '100%',height: 270 }}>
      <Swiper
      showsButtons={true} 
      autoplay
      showsPagination={true}
      autoplayTimeout={2}
      dotStyle={style.paginationDot}
      activeDotStyle={style.activePaginationDot}
      nextButton={ButtonSwiper(require('../resources/images/arrowRight.jpg'))}
      prevButton={ButtonSwiper(require('../resources/images/arrowLeft.jpg'))}
      >
        {data.map((imag) => (
          <View key={imag._id}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={{ uri: imag.img }} />
          </View>
        ))
        }
      </Swiper>
    </View>
  )
}

const style = StyleSheet.create({
  activePaginationDot: {
    backgroundColor: '#33907C',
    width: 8,
    height: 8,
  },
  paginationDot: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    width: 6,
    height: 6,
  },
})

export default memo(AppSwiper) 
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../stack/Header'
import styles from '../../commond/AppStyles'
import AppTextUnderLine from '../../commond/AppTextUnderLine'
import Appbutton from '../../commond/Appbutton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducer/ReducerUser'

const User = () => {
  const appReducer = useSelector((state) => state.user)

  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={style.container}>
      <Header
        title={'PROFILE'}
      />

      <View style={style.containerussername}>
        <Image style={style.icon} source={{uri: appReducer.user.avatar}} />
        <View>
          <Text style={[style.text16, { marginTop: 0 }]}>{appReducer.user.name}</Text>
          <Text style={style.text14}>{appReducer.user.email}</Text>
        </View>
      </View>

      <View>
        <AppTextUnderLine
          textLeft={'Chung'}
          styleLeft={[style.text16, { color: '#7F7F7F', marginTop: 30 }]}
        />

        <Appbutton
          text={'Chỉnh sửa thông tin'}
          event={() => navigation.navigate('Editinformation')}
          stylettext={style.text16} />

        <Appbutton
          text={'Cẩm nang trồng cây'}
          event={() => navigation.navigate('PlantGrowingGuide')}
          stylettext={style.text16} />

        <Appbutton
          text={' Q & A'}
          event={() => console.log('a')}
          stylettext={style.text16} />

        <Appbutton
          text={'Lịch sử giao dịch'}
          event={() => navigation.navigate('Transactionhistory')}
          stylettext={style.text16} />
      </View>

      <View>
        <AppTextUnderLine
          textLeft={'Bảo mật và Điều khoản'}
          styleLeft={[style.text16, { color: '#7F7F7F', marginTop: 30 }]}
        />

        <Appbutton
          text={'Điều khoản và điều kiện'}
          event={() => console.log('a')}
          stylettext={style.text16} />

        <Appbutton
          text={'Chính sách quyền riêng tư'}
          event={() => console.log('a')}
          stylettext={style.text16} />

        <Appbutton
          text={'Đăng xuất'}
          event={() => dispatch(logout())}
          stylettext={[style.text16, { color: 'red' }]} />

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...styles.backgroundAll,
    flex: 1,
    paddingBottom: 100,
    paddingHorizontal: 48
  },
  containerussername: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 180,
    marginRight: 26,
  },
  text16: {
    ...styles.font2,
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
    marginTop: 15
  },
  text14: {
    color: '#7F7F7F',
    ...styles.font2,
    fontSize: 14,
    lineHeight: 20
  }
})
export default User
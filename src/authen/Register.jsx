import { View, StyleSheet, Text, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from '../../commond/AppStyles'
import AppInput from '../../commond/AppInput'
import Appbutton from '../../commond/Appbutton'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AppImage from '../../commond/AppImage'
import AppText from '../../commond/AppText'
import AppLinearGradient from '../../commond/AppLinearGradient'
import UserApi from '../../api/UserApi'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../redux/reducer/ReducerUser'

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')

  const [nameError, setnameError] = useState('')
  const [passwordError, setpasswordError] = useState('')
  const [EmailError, setEmailError] = useState('')
  const [PhoneError, setPhoneError] = useState('')

  const registerfunc = async () => {
    const user = {
      email: Email,
      password: password,
      name: name,
      phoneNumber: Phone,
    }

    const result = await UserApi.register(user);
    if (result.status) {
      Alert.alert('đăng kí thành công');
      navigation.navigate('Login')
    } else {
      Alert.alert('Lỗi', result.data)
      dispatch(setLogin(false))
    }
  }
  return (
    <View style={style.container}>
      <View style={{
        position: 'absolute',
        top: -100,
        zIndex: 20,
        width: '100%'
      }}>
        <AppImage
          img={require('../../resources/images/nen.jpg')}
          styles={style.img}
        />
      </View>


      <View style={style.containerbody}>
        <AppText
          text={'Đăng kí'}
          styles={style.bigtext}
        />

        <AppText
          text={'Tạo tài khoản'}
          styles={style.mediumtext}
        />

        <AppInput
          styles={style.inputStyle}
          placeholder={'Họ tên'}
          value={name}
          setvalue={setname}
          eror={nameError}
          styleError={style.textError}
          entrypassword={false} />

        <AppInput
          styles={style.inputStyle}
          placeholder={'E-mail'}
          value={Email}
          setvalue={setEmail}
          eror={EmailError}
          styleError={style.textError}
          entrypassword={false} />

        <AppInput
          styles={style.inputStyle}
          placeholder={'Số điện thoại'}
          value={Phone}
          setvalue={setPhone}
          eror={PhoneError}
          styleError={style.textError}
          entrypassword={false} />

        <AppInput
          styles={style.inputStyle}
          placeholder={'Mật khẩu'}
          value={password}
          setvalue={setpassword}
          eror={passwordError}
          styleError={style.textError}
          entrypassword={true} />

        <View style={style.containerText}>
          {/* <AppText
            text={' Để đăng kí tài khoản, bạn đồng ý'}
            styles={style.styleTextmarrgin}
          />
          
          <Appbutton
            text={`Terms & Conditions`}
            styles={{}}
            event={() => console.log('he')}
            stylettext={style.styletextRegister}
          />

          <AppText
            text={'and'}
            styles={style.styleTextmarrgin}
          />

          <Appbutton
            text={'Privacy Policy'}
            styles={{}}
            event={() => console.log('he')}
            stylettext={style.styletextRegister}
          /> */}
          <Text style={style.styleTextmarrgin}>
            Để đăng kí tài khoản, bạn đồng ý <Text style={style.styletextRegister} onPress={() => { Alert.alert('hellooo') }}>Terms & Conditions</Text> and <Text style={style.styletextRegister} onPress={() => { Alert.alert('hellooo') }}>Privacy Policy</Text>
          </Text>

        </View>


        <AppLinearGradient
          styles={style.buttonClick}
          listcolor={['#007537', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Appbutton
            event={registerfunc}
            text={'Đăng ký'}
            styles={{}}
            stylettext={style.buttontext}
          />
        </AppLinearGradient>

        <View style={style.styleor}>
          <View style={style.lineThrough}>

          </View>

          <AppText
            text={'Hoặc'}
            styles={{ marginHorizontal: 9, color: 'black', ...styles.font1 }}
          />

          <View style={style.lineThrough}>

          </View>
        </View>

        <View style={style.containerImage}>
          <AppImage
            img={require('../../resources/images/google.png')}
            styles={{}}
          />
          <AppImage
            img={require('../../resources/images/facebook.png')}
            styles={{ marginLeft: 30 }}
          />
        </View>

        <View style={style.containerRegister}>
          <AppText
            text={' Tôi đã có tài khoản'}
            styles={{ fontSize: 15, color: 'black', ...styles.font1 }}
          />

          <Appbutton
            text={'Đăng nhập'}
            styles={{}}
            event={() => navigation.navigate('Login')}
            stylettext={style.styletextRegister}
          />
        </View>
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
  containerRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  styletextRegister: {
    ...styles.textColor,
    fontSize: 15,
    marginHorizontal: 5,
    ...styles.font1,
    textDecorationLine: 'underline',
  },
  styleor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24
  },
  lineThrough: {
    borderWidth: 1,
    flex: 1,
    borderColor: 'green'
  },
  containerText: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  },
  styleTextmarrgin: {
    ...styles.font1,
    fontSize: 15,
    color: 'black',
    textAlign: 'center'
  },
  container: {
    ...styles.container,
  }, containerbody: {
    marginTop: 178,
    padding: 30,
    backgroundColor: 'white',
  },
  bigtext: {
    ...styles.textbigsize,
    ...styles.font1
  },
  mediumtext: {
    ...styles.textmediumsize,
    ...styles.font1,
    marginTop: 10
  },
  textError: {
    ...styles.textError,
    ...styles.font1,
    marginTop: 6
  },
  inputStyle: {
    ...styles.inputStyle,
    ...styles.font1,
    marginTop: 10,
  },
  buttontext: {
    ...styles.buttonText,
    ...styles.font1,
  },
  buttonClick: {
    ...styles.buttonClick,
    marginTop: 20
  },
  containerImage: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default Register
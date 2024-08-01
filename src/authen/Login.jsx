import { View, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../../commond/AppStyles'
import AppInput from '../../commond/AppInput'
import Appbutton from '../../commond/Appbutton'
import AppButtonImage from '../../commond/AppButtonImage'
import { useNavigation } from '@react-navigation/native'
import AppText from '../../commond/AppText'
import AppImage from '../../commond/AppImage'
import AppLinearGradient from '../../commond/AppLinearGradient'
import UserApi from '../../api/UserApi'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);

  const navigation = useNavigation();
  const [email, setemail] = useState('email2@gmail.com');
  const [password, setpassword] = useState('123456qQ!');

  const [eye, seteye] = useState(false);
  const [checkbox, setcheckbox] = useState(false);

  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const loginfunc = async () => {
    const user = {
      email: email,
      password: password
    }
    dispatch(UserApi.login(user))
  }

  const thongbao = () => {
    Alert.alert('heh ' + email);
  }

  return (
    <View style={style.container}>
      <AppImage
        img={require('../../resources/images/nen.jpg')}
        styles={style.img}
      />

      <View style={style.containerbody}>
        <AppText
          text={'Chào mừng bạn'}
          styles={style.bigtext}
        />

        <AppText
          text={'Đăng nhập tài khoản'}
          styles={style.mediumtext}
        />

        <AppInput
          styles={style.inputStyle}
          placeholder={'Nhập email'}
          value={email}
          setvalue={setemail}
          eror={emailError}
          styleError={style.textError}
          entrypassword={false} />

        <View>
          <AppInput
            styles={style.inputStyle}
            placeholder={'Mật khẩu'}
            value={password}
            setvalue={setpassword}
            eror={passwordError}
            styleError={style.textError}
            entrypassword={!eye}
          />

          <AppButtonImage
            styleimg={{}}
            img={eye ? require('../../resources/images/open_eye.png') : require('../../resources/images/close_eye.png')}
            stylebutton={style.styleImageEye}
            event={() => seteye(!eye)}
          />
        </View>

        <View style={style.forgotPassword}>
          <View style={{ flexDirection: 'row' }}>
            <AppButtonImage
              styleimg={{}}
              img={checkbox ? require('../../resources/images/checkbox_true.png') : require('../../resources/images/checkbox.png')}
              stylebutton={{}}
              event={() => setcheckbox(!checkbox)}
            />
            <AppText text={'Nhớ tài khoản'} styles={{ marginLeft: 5 }} />
          </View>

          <Appbutton
            event={() => thongbao()}
            text={'Forgot password ?'}
            styles={{}}
            stylettext={style.textColor} />
        </View>

        <AppLinearGradient
          styles={style.buttonClick}
          listcolor={['#D46C4E', '#F9AD6A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Appbutton
            event={() => loginfunc()}
            text={'Đăng nhập'}
            styles={{}}
            stylettext={style.buttontext}
          />
        </AppLinearGradient>


        <View style={style.styleor}>
          <View style={style.lineThrough}>

          </View>

          <AppText text={'Hoặc'} styles={{ marginHorizontal: 9 }} />

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
          <AppText text={' Bạn không có tài khoản'} styles={{ fontSize: 12, ...styles.font1 }} />
          <Appbutton
            text={'Tạo tài khoản'}
            styles={{}}
            event={() => navigation.navigate('Register')}
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
    height: 230,
    resizeMode: 'stretch'
  },
  styleImageEye: {
    position: 'absolute',
    right: 15,
    bottom: 11
  },
  textError: {
    ...styles.textError,
    ...styles.font1,
    marginTop: 6
  },
  containerRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  styletextRegister: {
    ...styles.textColor,
    fontSize: 12,
    marginLeft: 5,
    ...styles.font1
  },
  containerImage: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textColor: {
    ...styles.textColor,
    ...styles.font1,
    fontSize: 11
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
  containerbody: {
    padding: 30,
    backgroundColor: 'white'
  },
  buttontext: {
    ...styles.buttonText,
    ...styles.font1,
  },
  buttonClick: {
    ...styles.buttonClick,
  },
  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 22
  },
  bigtext: {
    ...styles.textbigsize,
    ...styles.font1
  },
  mediumtext: {
    ...styles.textmediumsize,
    ...styles.font1
  },
  inputStyle: {
    ...styles.inputStyle,
    ...styles.font1,
    marginTop: 20,
  },
  container: {
    ...styles.container
  }
})

export default Login
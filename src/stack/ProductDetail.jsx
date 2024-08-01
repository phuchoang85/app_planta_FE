import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AppSwiper from '../../commond/AppSwiper'
import Header from './Header'
import Appbutton from '../../commond/Appbutton'
import styles from '../../commond/AppStyles'
import AppTextUnderLine from '../../commond/AppTextUnderLine'
import AppButtonImage from '../../commond/AppButtonImage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AppChangePrice from '../../commond/AppChangePrice'
import AppToogleGuide from '../../commond/AppToogleGuide'
import ProductApi from '../../api/ProductApi'
import CartApi from '../../api/CartApi'
import { useSelector } from 'react-redux'

const ProductDetail = ({ route }) => {
  const colorBlur = '#7D7B7B';
  const colorBlurButton = '#ABABAB'
  const colotBlack = 'black';
  const colorGreen = '#D46C4E';

  const userStore = useSelector((state) => state.user);

  const { data, type } = route.params
  const navigation = useNavigation();
  const [selectquantity, setselectquantity] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const [detail, setdetail] = useState({});

  const getDataDetail = async () => {
    const result = await ProductApi.getProductDetail(data);
    if (result.status) {
      setdetail(result.data);
      setisLoading(false)
    } else {
      console.log(result.data);
      Alert.alert('Lỗi', 'kiểm tra mạng của bạn')
    }
  }

  useFocusEffect(useCallback(() => {
    getDataDetail();
  }, []))


  const updateselectquantity = (status) => {
    switch (status) {
      case 'increase':
        if (selectquantity <= detail.quantity) {
          setselectquantity(selectquantity + 1);
          settotalPrice((selectquantity + 1) * detail.price);
        }
        break;

      case 'decrease':
        if (selectquantity != 0) {
          setselectquantity(selectquantity - 1);
          settotalPrice((selectquantity - 1) * detail.price);
        }

        break;

      default:
        break;
    }
  }

  const addCart = async () => {
    setisLoading(true)
    const body = {
      count: selectquantity,
      product: data,
      checkbox: false
    }
    await addtoCartApi(body);
  }

  const addtoCartApi = async (cart) => {
    const result = await CartApi.addCart(userStore.user._id, cart)
    if (result) {
      // setcart({ key: 'load', data: result.data })
      setisLoading(false)
    }
    else {
      Alert.alert("Lỗi", "Hãy kiểm tra lại mạng")
    }
  }



  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Đang tải</Text>
      </View>
    )
  }

  return (
    <View>
      <Header
        iconLeft={require('../../resources/images/arrowLeft.jpg')}
        title={detail.name}
        iconRight={require('../../resources/images/cart.png')}
        eventLeft={() => navigation.goBack()}
        eventRight={() => navigation.navigate('Cart')}
      />
      <AppSwiper
        data={detail.imgs}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.containerBody}>

        <View style={style.containerCata}>

          <Appbutton
            text={detail.catalog.title}
            styles={style.buttonCatalog}
            event={() => { }}
            stylettext={style.textCatalog}
          />

          {detail.prototy.length > 0 &&
            detail.prototy.map(ele => {
              return (
                <View key={ele._id}>
                  <Appbutton
                    text={ele.title}
                    styles={style.buttonCatalog}
                    event={() => { }}
                    stylettext={style.textCatalog}
                  />
                </View>
              )
            })
          }
        </View>

        {
          type == 'guide' &&
          <View>
            <AppToogleGuide
              data={detail.knowledge}
              comment={'Kiến thức cơ bản'}
              styletext={{ color: 'black' }}
              imgShow={require('../../resources/images/unshow.jpg')}
              imgClose={require('../../resources/images/show.jpg')}
            />

            <View style={{ flex: 1, height: 2, backgroundColor: 'green' }}></View>
{/* 
            <AppToogleGuide
              data={detail.stage}
              comment={'Các giai đoạn'}
              styletext={{ marginTop: 16 }}
              imgShow={require('../../resources/images/unshow.jpg')}
              imgClose={require('../../resources/images/show.jpg')}
            /> */}
          </View>
        }


        {type == 'product' &&
          <View>
            <Text style={style.textPrice}>
              {AppChangePrice(detail.price)}đ
            </Text>

            <AppTextUnderLine
              textLeft={'Chi tiết sản phẩm'}
              textRight={null}
              styleLeft={style.textDetail}
              styleRight={{}}
            />

            {/* <AppTextUnderLine
              textLeft={'Kích cỡ'}
              textRight={detail.size}
              styleLeft={style.textSmallDetail}
              styleRight={style.textSmallDetail}
            /> */}

            <AppTextUnderLine
              textLeft={'Xuất sứ'}
              textRight={detail.origin}
              styleLeft={style.textSmallDetail}
              styleRight={style.textSmallDetail}
            />

            <AppTextUnderLine
              textLeft={'Tình trạng'}
              textRight={'Còn lại ' + detail.quantity + ' sp'}
              styleLeft={style.textSmallDetail}
              styleRight={style.textSmallDetailGreen}
            />

            <AppTextUnderLine
              textLeft={'Mô tả sản phẩm '}
              textRight={null}
              styleLeft={style.textDetail}
              styleRight={{}}
            />

            <Text style={style.textSmallDetail}>
              {detail.description}
            </Text>

            <View style={style.paddingBottom}>

            </View>
          </View>
        }
      </ScrollView>


      {type == 'product' &&
        <View style={style.containerBottom}>
          <View style={style.containerTotalPrice}>
            <View >
              <Text style={style.textSmallDetail}>Đã chọn 0 sản phẩm</Text>
              <View style={style.containerSelect}>
                <AppButtonImage
                  styleimg={[style.icon, , { tintColor: selectquantity == 0 ? colorBlur : colotBlack }]}
                  img={require('../../resources/images/minus.jpg')}
                  stylebutton={{}}
                  event={() => updateselectquantity('decrease')} />
                <Text style={style.textDetail}>{selectquantity}</Text>
                <AppButtonImage
                  styleimg={[style.icon, { tintColor: selectquantity == detail.quantity ? colorBlur : colotBlack }]}
                  img={require('../../resources/images/plus.jpg')}
                  stylebutton={{}}
                  event={() => updateselectquantity('increase')} />
              </View>
            </View>

            <View>
              <Text style={style.textSmallDetail}>Tạm tính</Text>
              <Text style={style.textbigDetail}>{AppChangePrice(totalPrice)}đ</Text>
            </View>


          </View>

          <Appbutton
            text={'CHỌN MUA'}
            styles={[style.buttonClick, { backgroundColor: selectquantity == 0 ? colorBlurButton : colorGreen }]}
            event={() => {
              if (selectquantity != 0) {
                addCart();
              }
            }}
            stylettext={[style.textDetail, { color: 'white' }]}
          />

        </View>
      }
    </View>
  )
}


const style = StyleSheet.create({
  paddingBottom: {
    height: 180,
  },
  buttonClick: {
    width: 'auto',
    height: 50,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 30,
    height: 30,
  },
  containerSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, containerBottom: {
    width: ' 100%',
    ...styles.backgroundAll,
    justifyContent: 'center',
    paddingHorizontal: 26,
    paddingBottom: 15,
    position: 'absolute',
    bottom: 20,
  },
  containerTotalPrice: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSmallDetailGreen: {
    ...styles.font2,
    fontSize: 14,
    lineHeight: 20,
    color: '#007537'
  },
  textSmallDetail: {
    ...styles.font2,
    fontSize: 14,
    lineHeight: 20,
    color: 'black'
  },
  textDetail: {
    ...styles.font2,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: 'black'
  }, textbigDetail: {
    ...styles.font2,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 34,
    color: 'black'
  },
  textPrice: {
    ...styles.font2,
    fontSize: 24,
    color: 'green',
    fontWeight: '500'
  },
  containerBody: {
    paddingHorizontal: 48,
    ...styles.backgroundAll,
    height: '60%',
  },
  containerCata: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  buttonCatalog: {
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 4,
    marginRight: 8
  },
  textCatalog: {
    ...styles.font2,
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  }
})

export default ProductDetail
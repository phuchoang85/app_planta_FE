import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Header from './Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import styles from '../../commond/AppStyles'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import RenderCart from '../../renderList/RenderCart'
import AppModal from '../../commond/AppModal'
import AppChangePrice from '../../commond/AppChangePrice'
import CartApi from '../../api/CartApi'
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmOrder, setTotalPrice } from '../redux/reducer/ReducerConfirmOrder'

//cart laf giỏ hàng còn addtocart là danh sách được đánh dấu 
const Cart = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const appReducer = useSelector((state) => state.user)
    const [cart, setcart] = useState([])

    const [isLoading, setisLoading] = useState(true);
    const [iditem, setiditem] = useState(-1)
    const [ismodal, setismodal] = useState(false)
    const [totalPrice, settotalPrice] = useState(0);
    const timeoutRef = useRef(null);
    const deleteOne = async () => {
        const body = {
            _id: appReducer.user._id,
            idproduct: iditem
        }

        const result = await CartApi.deleteCart(body);
        if (result.status) {
            setcart(cart.filter(ele => ele._id != iditem));
        } else {
            console.log(result.data)
            Alert.alert("lỗi", "không xóa được sản phẩm vui lòng thử lại ")
        }
        setiditem(-1)
    }

    const deleteAll = async () => {
        if (totalPrice == 0) {
            const result = await CartApi.deleteAllCart(appReducer.user._id);
            if (result.status) {
                setcart([]);
                Alert.alert('Thành công', 'Xóa thành công')
            } else {
                Alert.alert('Lỗi', 'Xóa thất bại hãy thử lại')
            }

        } else {
            const result = await CartApi.deleteproducthavecheckCart(appReducer.user._id);
            if (result.status) {
                setcart(cart.filter(ele => ele.checkbox == false))
                Alert.alert('Thành công', 'Xóa thành công')
            } else {
                Alert.alert('Lỗi', 'Xóa thất bại hãy thử lại')
            }
        }


        console.log("delete all success")
    }

    const getdataCart = async () => {
        const result = await CartApi.getCart(appReducer.user._id);
        if (result.status) {
            setcart(result.data)

            setisLoading(false);
        } else {
            Alert.alert('Lỗi', "kiểm tra mạng của bạn");
        }
    }

    useFocusEffect(useCallback(() => {
        getdataCart()
    }, []))

    useEffect(() => {
        let tong = 0
        cart.map(ele => {
            if (ele.checkbox) {
                tong += ele.product.price * ele.count
            }
        })
        settotalPrice(tong)
    }, [cart])

    const handleCartChange = (newCart) => {
        setcart(newCart);
        debouncedUpdateCart();
    };


    const chuyentrang = () => {
        const listcheck = cart.filter(ele => ele.checkbox == true);
        if (listcheck.length > 0) {
            dispatch(setTotalPrice(totalPrice))
            dispatch(setConfirmOrder(listcheck))
            navigation.navigate('PayPage');
        }
        else
            Alert.alert('Bạn chưa chọn sản phẩm để thanh toán');
    }

    const debouncedUpdateCart = useCallback((quantity, check, item, cart) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setcart(cart.map(ele => {
                if (ele._id == item._id) {
                    return { ...ele, count: quantity, checkbox: check };
                }
                return ele
            }))

            console.log("Updating cart to API...");

            CartApi.updateCart(appReducer.user._id, {
                cart: cart.map(ele => {
                    if (ele._id == item._id) {
                        return { ...ele, count: quantity, checkbox: check };
                    }

                    return ele
                })
            })
        }, 700);
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Đang tải</Text>
            </View>
        )
    }


    return (
        <View style={style.container}>
            <Header
                iconLeft={require('../../resources/images/arrowLeft.jpg')}
                title={'GIỎ HÀNG'}
                iconRight={require('../../resources/images/trash-can.png')}
                eventLeft={() => navigation.goBack()}
                eventRight={() => setismodal(true)}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 24 }}>
                <AppFlatListProductHome
                    data={cart}
                    number={1}
                    renderitem={({ item }) => {
                        return <RenderCart
                            item={item}
                            setismodal={setismodal}
                            setiditem={setiditem}
                            setcart={setcart}
                            cart={cart}
                            debouncedUpdateCart={debouncedUpdateCart}
                        />
                    }}
                    textEmpty={'Giỏ hàng của bạn hiện đang trống'}
                />

            </ScrollView>


            <AppModal
                eventSucces={() => {
                    iditem == -1 ? deleteAll() : deleteOne()
                }}
                setismodal={setismodal}
                ismodal={ismodal}
                title={totalPrice > 0 ? "Xóa các sản phẩm đã được chọn" : iditem == -1 ? 'Xác nhận xoá tất cả đơn hàng?' : 'Xác nhận xoá đơn hàng?'}
                comment={'Thao tác này sẽ không thể khôi phục.'}
            />

            <View style={style.containerBottom}>
                <View style={style.containerText}>
                    <Text style={style.textDetail}>
                        Tạm tính
                    </Text>
                    <Text style={style.textPrice}>
                        {AppChangePrice(totalPrice)}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => chuyentrang()}
                    style={style.containerTouachble}>
                    <Text style={style.textButton}>
                        Tiến hành thanh toán
                    </Text>
                    <Image style={style.icon} source={require('../../resources/images/rightWhite.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const style = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    },
    textButton: {
        ...styles.font2,
        fontSize: 18,
        lineHeight: 20,
        color: 'white'
    },
    textPrice: {
        ...styles.font2,
        fontSize: 16,
        lineHeight: 22,
        color: 'black'
    },
    textDetail: {
        ...styles.font2,
        fontSize: 14,
        lineHeight: 20,
        color: 'black'
    },
    containerTouachble: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D46C4E',
        borderRadius: 8,
        height: 50
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },
    containerBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 28,
        paddingVertical: 8
    },
    container: {
        ...styles.backgroundAll,
        flex: 1
    }
})

export default Cart

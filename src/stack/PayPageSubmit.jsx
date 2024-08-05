import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, Animated, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../../commond/AppStyles';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import AppTextUnderLine from '../../commond/AppTextUnderLine';
import AppInputUnderLine from '../../commond/AppInputUnderLine';
import AppChangePrice from '../../commond/AppChangePrice';
import Appbutton from '../../commond/Appbutton';
import AppModal from '../../commond/AppModal';
import { useDispatch, useSelector } from 'react-redux';
import OrderApi from '../../api/OrderApi';
import { setConfirmOrder  } from '../redux/reducer/ReducerConfirmOrder';

const PayPageSubmit = ({ route }) => {
    const { payment, express, user } = route.params;
    const confirmorder = useSelector((state) => state.confirmOrder);
    const distpatch = useDispatch();
    const [ismodal, setismodal] = useState(false)

    const navigation = useNavigation();

    const [sothe, setsothe] = useState('');
    const [tennguoidung, settennguoidung] = useState('');
    const [ngayhethan, setngayhethan] = useState('');
    const [macvv, setmacvv] = useState('');


    const [erorsothe, seterorsothe] = useState('')
    const [erortennguoidung, seterortennguoidung] = useState('')
    const [erorngayhethan, seterorngayhethan] = useState('')
    const [erormacvv, seterormacvv] = useState('')

    const [click, setclick] = useState(1);


    const animationValue = useRef(new Animated.Value(0)).current;

    const translateYAnimation = {
        transform: [
            { translateY: animationValue },
        ]
    };

    // kiểm tra keyboard có đang bật hay không để show hay ẩn cái box ở cuối 
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => Animated.timing(animationValue, {
                toValue: 300,
                duration: 200,
                useNativeDriver: true
            }).start()
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => Animated.timing(animationValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start()
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    //các hàm kiểm tra lỗi nhập 
    const endEditsothe = (text) => {
        if (!text) {
            seterorsothe('Hãy nhập đầy đủ họ và tên');
        } else {
            seterorsothe('');
        }
        setclick(click + 1)
    }

    const endEdittennguoidung = (text) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?=.*[@])[A-Za-z\d@]+(\.[A-Za-z\d@]+)*\.[A-Za-z]+$/;

        if (!text) {
            seterortennguoidung('hãy nhập đầy đủ tennguoidung');
        } else if (!text.match(regex)) {
            seterortennguoidung('hãy nhập đsung định dạng tennguoidung tennguoidung@gmai.com');
        } else {
            seterortennguoidung('');
        }
        setclick(click + 1)
    }

    const endEditngayhethan = (text) => {
        if (!text || text.length < 10) {
            seterorngayhethan('Hãy nhập đầy đủ địa chỉ');
        } else {
            seterorngayhethan('');
        }
        setclick(click + 1)
    }

    const endEditmacvv = (text) => {
        const regex = /(03 || 09)\\d[8]/

        if (!text) {
            seterormacvv('Hãy nhập đủ số điện thoại');
        } else if (!text.match(regex)) {
            seterormacvv('Hãy đúng định dạng số điện thoại 0**********');
        } else {
            seterormacvv('');
        }
        setclick(click + 1)
    }

    const onPressContinue = () => {
        setclick(click + 1);
        setismodal(true)
    }

    const formatBankCardNumber = (cardNumber) => {
        // Giữ lại chỉ 4 số cuối cùng và thay thế các số còn lại bằng 'X'

        let maskedNumber = cardNumber.slice(0, -4).replace(/\d/g, 'X') + cardNumber.slice(-4);
        // Thêm dấu cách sau mỗi 4 ký tự
        return maskedNumber.replace(/(.{4})/g, '$1 ');
    }

    const thanhtoan =async () => {
     
        const body = {
            user: user._id,
            namePayOrder: user.username,
            emailPayOrder: user.email,
            addressPayOrder: user.address,
            phonenumberPayOrder: user.phonenumber,
            payment: payment,
            express: express,
            listproduct: confirmorder.list,
            totalPrice: confirmorder.totalPrice
        }


        const result = await OrderApi.addOrder(body);
        console.log(result)
        if(result.status){
            distpatch(setConfirmOrder([]))
            navigation.navigate('NotifiPage',
            {
                payment: payment,
                express: express,
                user: user, title: 'THÔNG BÁO',
                totalCartsubmit: confirmorder.totalPrice,
                cartContext: confirmorder.list,
                isSucces: 'Hàng đang chờ xác nhận'
            })
        }else{
            console.log(result.data)
            Alert.alert('Lỗi', 'quay lại giỏ hàng kiểm tra')
        }


       
    }


    return (
        <KeyboardAvoidingView

            style={style.container}>
            <View style={style.container}>
                <Header
                    iconLeft={require('../../resources/images/arrowleft.jpg')}
                    title={'THANH TOÁN'}
                    eventLeft={() => navigation.navigate('PayPage')}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.containerBody}>
                    {
                        payment  == "Thẻ ATM" && (
                            <View>
                        <AppTextUnderLine
                            textLeft={'Nhập thông tin thẻ'}
                            styleLeft={style.textTitle}
                        />

                        <AppInputUnderLine
                            placeholder={'Nhập số thẻ'}
                            value={formatBankCardNumber(sothe)}
                            setvalue={setsothe}
                            eror={erorsothe}
                            eventEndEdit={endEditsothe}
                            click={click}
                            type={'numberic'}
                        />

                        <AppInputUnderLine
                            placeholder={'Nhập tên'}
                            value={tennguoidung}
                            setvalue={settennguoidung}
                            eror={erortennguoidung}
                            eventEndEdit={endEdittennguoidung}
                            click={click}
                        />

                        <AppInputUnderLine
                            placeholder={'Nhập ngày hết hạn (MM/YY)'}
                            value={ngayhethan}
                            setvalue={setngayhethan}
                            eror={erorngayhethan}
                            eventEndEdit={endEditngayhethan}
                            click={click}
                        />
                        <View style={{ width: '49%' }}>
                            <AppInputUnderLine
                                placeholder={'CVV'}
                                secureTextEntry={true}
                                value={macvv}
                                setvalue={setmacvv}
                                eror={erormacvv}
                                eventEndEdit={endEditmacvv}
                                click={click}
                                type={'numberic'}
                            />
                            <Image style={{ width: 16, height: 16, position: 'absolute', right: 0, bottom: 5 }}
                                source={require('../../resources/images/i.jpg')} />
                        </View>

                    </View> )
                    }
                    <View>
                        <AppTextUnderLine
                            textLeft={'Thông tin khách hàng'}
                            styleLeft={style.textTitle}
                        />
                        <Text style={[style.textSmall, { marginTop: 15 }]}>
                            {user.username}
                        </Text>
                        <Text style={[style.textSmall, { marginTop: 15 }]}>
                            {user.email}
                        </Text>
                        <Text style={[style.textSmall, { marginTop: 15 }]}>
                            {user.phonenumber}
                        </Text>
                        <Text style={[style.textSmall, { marginTop: 15 }]}>
                            {user.address}
                        </Text>

                        <AppTextUnderLine
                            textLeft={'Phương thức vận chuyển'}
                            styleLeft={style.textTitle}
                        />
                        <Text style={[style.textSmall, { marginTop: 15 }]}>
                            {express.title} - {AppChangePrice(express.price)}đ
                        </Text>
                    </View>

                    <View style={{ height: 165 }}>

                    </View>
                </ScrollView>

                <Animated.View style={[translateYAnimation, style.containerBottom]}>
                    <View style={style.containerText}>
                        <Text style={[style.textSmall, { color: '#000000', opacity: 0.6 }]}>Tạm tính</Text>
                        <Text style={[style.textSmall, { color: '#000000' }]}>{AppChangePrice(confirmorder.totalPrice)}đ</Text>
                    </View>
                    <View style={style.containerText}>
                        <Text style={[style.textSmall, { color: '#000000', opacity: 0.6 }]}>Phí vận chuyển</Text>
                        <Text style={[style.textSmall, { color: '#000000' }]}>{AppChangePrice(express.price)}đ</Text>
                    </View>
                    <View style={style.containerText}>
                        <Text style={[style.textSmall, { color: '#000000', opacity: 0.6 }]}>Tổng cộng</Text>
                        <Text style={[style.textSmall, { color: '#007537' }]}>{AppChangePrice(confirmorder.totalPrice + express.price)}đ</Text>
                    </View>
                    <Appbutton
                        text={'TIẾP TỤC'}
                        styles={[style.buttonNext, { backgroundColor: '#D46C4E' }]}
                        event={() => onPressContinue()}
                        stylettext={[style.textSmall, { color: 'white' }]}
                    />
                </Animated.View>

                <AppModal
                    eventSucces={() => thanhtoan()}
                    setismodal={setismodal}
                    ismodal={ismodal}
                    title={'Xác nhận thanh toán'}
                    comment={''}
                />
            </View>

        </KeyboardAvoidingView>

    )
}

const style = StyleSheet.create({
    buttonNext: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 8
    },
    textBig: {
        ...styles.font2,
        fontSize: 16,
        lineHeight: 22
    },
    textSmall: {
        ...styles.font2,
        fontSize: 14,
        lineHeight: 20
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerBottom: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 25,
        paddingVertical: 15,
        ...styles.backgroundAll,
        width: '100%'
    },
    containerBody: {
        paddingHorizontal: 48,
    },
    container: {
        ...styles.backgroundAll,
        flex: 1
    }, textTitle: {
        ...styles.font2,
        fontSize: 16,
        lineHeight: 22,
        color: 'black',
        marginTop: 15,
    },
})

export default PayPageSubmit
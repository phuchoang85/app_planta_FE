import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../../commond/AppStyles';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import AppTextUnderLine from '../../commond/AppTextUnderLine';
import AppInputUnderLine from '../../commond/AppInputUnderLine';
import AppSelect from '../../commond/AppSelect';
import AppFlatListProductHome from '../../commond/AppFlatListProductHome';
import RenderSearch from '../../renderList/RenderSearch';
import AppChangePrice from '../../commond/AppChangePrice';
import Appbutton from '../../commond/Appbutton';
import { useSelector } from 'react-redux';

const PayPage = () => {
    const appReducer = useSelector((state) => state.user)
    const confirmorder = useSelector((state) => state.confirmOrder);
    const navigation = useNavigation();

    const [username, setusername] = useState(appReducer.user.name);
    const [email, setemail] = useState(appReducer.user.email);
    const [address, setaddress] = useState(appReducer.user.address);
    const [phonenumber, setphonenumber] = useState(appReducer.user.phonenumber);


    const [erorname, seterorname] = useState('')
    const [eroremail, seteroremail] = useState('')
    const [eroraddress, seteroraddress] = useState('')
    const [erorphonenumber, seterorphonenumber] = useState('')

    const [selectExpressType, setselectExpressType] = useState(1);
    const [selectPayment, setselectPayment] = useState(1)

    const today = new Date();
    const nextThreeDays = new Date(today);
    nextThreeDays.setDate(today.getDate() + 3);

    
    const [click, setclick] = useState(1);
    const listSelectExprex = [
        { title: 'Gia hàng nhanh', id: 1, price: 15000, comment: `Dự kiến giao hàng ${today.getDate()}/${today.getMonth() + 1} - ${nextThreeDays.getDate()}/${nextThreeDays.getMonth() + 1}` },
        { title: 'Gia hàng COD', id: 2, price: 20000, comment: `Dự kiến giao hàng ${today.getDate()}/${today.getMonth() + 1} - ${nextThreeDays.getDate()}/${nextThreeDays.getMonth() + 1}` }
    ];

    const listSelectPayment = [
        { title: 'Thẻ VISA/MASTERCARD', id: 1, },
        { title: 'Thẻ ATM', id: 2, }
    ]

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
    const endEditUsername = () => {
        if (!username.trim()) {
            seterorname('Hãy nhập đầy đủ họ và tên');
        } else {
            seterorname('');
        }
        setclick(click + 1)
    }

    const endEditEmail = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?=.*[@])[A-Za-z\d@]+(\.[A-Za-z\d@]+)*\.[A-Za-z]+$/;

        if (!email.trim()) {
            seteroremail('hãy nhập đầy đủ email');
        } else if (!email.match(regex)) {
            seteroremail('hãy nhập đúng định dạng email email@gmai.com');
        } else {
            seteroremail('');
        }
        setclick(click + 1)
    }

    const endEditAddress = () => {
        if (!address.trim() || address.length < 10) {
            seteroraddress('Hãy nhập đầy đủ địa chỉ');
        } else {
            seteroraddress('');
        }
        setclick(click + 1)
    }

    const endEditPhoneNumber = () => {
        const regex = /(03 || 09)\\d[8]/

        if (!phonenumber.trim()) {
            seterorphonenumber('Hãy nhập đủ số điện thoại');
        } else if (!phonenumber.match(regex)) {
            seterorphonenumber('Hãy đúng định dạng số điện thoại 0**********');
        } else {
            seterorphonenumber('');
        }
        setclick(click + 1)
    }

    const onPressContinue = () => {
        setclick(click + 1);
        const users = {
            _id: appReducer.user._id,
            username: username,
            email: email,
            phonenumber: phonenumber,
            address: address,
        }

        navigation.navigate('PayPageSubmit', {
            payment: listSelectPayment[listSelectExprex.findIndex(ele => ele.id == selectPayment)].title,
            express: listSelectExprex[listSelectExprex.findIndex(ele => ele.id == selectExpressType)],
            user: users
        });
    }


    return (
        <KeyboardAvoidingView

            style={style.container}>
            <View style={style.container}>
                <Header
                    iconLeft={require('../../resources/images/arrowLeft.jpg')}
                    title={'THANH TOÁN'}
                    eventLeft={() => navigation.navigate('Cart')}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.containerBody}>
                    <View>
                        <AppTextUnderLine
                            textLeft={'Thông tin khách hàng'}
                            styleLeft={style.textTitle}
                        />

                        <AppInputUnderLine
                            placeholder={'tên khách hàng'}
                            value={username}
                            setvalue={setusername}
                            eror={erorname}
                            eventEndEdit={endEditUsername}
                            click={click}
                        />

                        <AppInputUnderLine
                            placeholder={'Nhập email'}
                            value={email}
                            setvalue={setemail}
                            eror={eroremail}
                            eventEndEdit={endEditEmail}
                            click={click}
                        />

                        <AppInputUnderLine
                            placeholder={'Nhập địa chỉ'}
                            value={address}
                            setvalue={setaddress}
                            eror={eroraddress}
                            eventEndEdit={endEditAddress}
                            click={click}
                        />

                        <AppInputUnderLine
                            placeholder={'Số điện thoại'}
                            value={phonenumber}
                            setvalue={setphonenumber}
                            eror={erorphonenumber}
                            eventEndEdit={endEditPhoneNumber}
                            click={click}
                        />
                    </View>

                    <View>
                        <AppSelect
                            title={'Phương thức vận chuyển '}
                            type={2}
                            selectType={selectExpressType}
                            setselectType={setselectExpressType}
                            listSelect={listSelectExprex}
                        />

                        <AppSelect
                            title={'Hình thức thanh toán'}
                            type={1}
                            selectType={selectPayment}
                            setselectType={setselectPayment}
                            listSelect={listSelectPayment}
                        />
                    </View>

                    <View>
                        <AppTextUnderLine
                            textLeft={'Đơn hàng đã chọn'}
                            styleLeft={style.textTitle}
                        />
                        <AppFlatListProductHome
                            data={confirmorder.list}
                            number={1}
                            renderitem={({ item }) => {
                                return <RenderSearch
                                    item={item}
                                    type={'PayPage'} />
                            }}

                        />
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
                        <Text style={[style.textSmall, { color: '#000000' }]}>{AppChangePrice(listSelectExprex[listSelectExprex.findIndex(ele => ele.id == selectExpressType)].price)}đ</Text>
                    </View>
                    <View style={style.containerText}>
                        <Text style={[style.textSmall, { color: '#000000', opacity: 0.6 }]}>Tổng cộng</Text>
                        <Text style={[style.textSmall, { color: '#007537' }]}>{AppChangePrice(confirmorder.totalPrice + listSelectExprex[listSelectExprex.findIndex(ele => ele.id == selectExpressType)].price)}đ</Text>
                    </View>
                    <Appbutton
                        text={'TIẾP TỤC'}
                        styles={[style.buttonNext, { backgroundColor: '#007537' }]}
                        event={() => onPressContinue()}
                        stylettext={[style.textSmall, { color: 'white' }]}
                    />
                </Animated.View>
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

export default PayPage
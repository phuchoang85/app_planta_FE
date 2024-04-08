import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../../commond/AppStyles';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import AppTextUnderLine from '../../commond/AppTextUnderLine';
import AppChangePrice from '../../commond/AppChangePrice';
import Appbutton from '../../commond/Appbutton';
import AppFlatListProductHome from '../../commond/AppFlatListProductHome';
import RenderSearch from '../../renderList/RenderSearch';

const NotifiPage = ({ route }) => {
    const { payment, express, user, title,totalCartsubmit, cartContext, isSucces } = route.params;

    const navigation = useNavigation();


    return (
        <KeyboardAvoidingView
            style={style.container}>
            <View style={style.container}>
                <Header
                    iconLeft={require('../../resources/images/arrowLeft.jpg')}
                    title={title}
                    eventLeft={() => navigation.goBack()}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.containerBody}>

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

                        <View>
                            <AppTextUnderLine
                                textLeft={'Phương thức vận chuyển'}
                                styleLeft={style.textTitle}
                            />
                            <Text style={[style.textSmall, { marginTop: 15 }]}>
                                {express.title} - {AppChangePrice(express.price)}đ
                            </Text>
                            <Text style={[style.textSmall, { marginTop: 15 }]}>
                                {express.comment}
                            </Text>
                        </View>

                        <View>
                            <AppTextUnderLine
                                textLeft={'Hình thức thanh toán'}
                                styleLeft={style.textTitle}
                            />
                            <Text style={[style.textSmall, { marginTop: 15 }]}>
                                {payment}
                            </Text>
                        </View>

                        <AppTextUnderLine
                                textLeft={'Đơn hàng đã chọn'}
                                styleLeft={style.textTitle}
                            />
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ paddingHorizontal: 24 }}>
                            <AppFlatListProductHome
                                 data={cartContext}
                                 number={1}
                                 renderitem={({ item }) => {
                                     return <RenderSearch
                                         item={item}
                                         type={'PayPage'} />
                                 }}
                            />
                        </ScrollView>
                    </View>

                    <View style={{ height: 165 }}>

                    </View>
                </ScrollView>

                <View style={[ style.containerBottom]}>
                    <View style={style.containerText}>
                        <Text style={[style.textSmall, { color: '#000000', opacity: 0.6 }]}>{isSucces}</Text>
                        <Text style={[style.textSmall, { color: '#000000' }]}>{AppChangePrice(totalCartsubmit)}đ</Text>
                    </View>
                
                    <Appbutton
                        text={title == 'THÔNG BÁO' ? 'TIẾP TỤC' : 'Xem cẩm nang trồng cây'}
                        styles={[style.buttonNext, { backgroundColor: '#007537' }]}
                        event={() =>title == 'THÔNG BÁO' ?  navigation.navigate('Notification') : navigation.navigate('PlantGrowingGuide') }
                        stylettext={[style.textSmall, { color: 'white' }]}
                    />

                    <Appbutton
                        text={'Quay về Trang chủ'}
                        styles={[style.buttonNext, { backgroundColor: 'white' }]}
                        event={() => navigation.navigate('Home')}
                        stylettext={[style.textSmall, { color: 'black', textDecorationLine: 'underline' }]}
                    />
                </View>
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
        marginTop: 8,
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

export default NotifiPage

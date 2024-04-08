import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AppTextUnderLine from '../commond/AppTextUnderLine'
import AppFlatListProductHome from '../commond/AppFlatListProductHome'
import RenderSearch from './RenderSearch'
import styles from '../commond/AppStyles'

const RenderDateNotifi = (props) => {
    const { item, navigation } = props


    const isSucces = item.status == 1 ? "Đang xác nhận đơn hàng" :
        item.status == 2 ? "Đang giao hàng" :
            item.status == 3 ? "Đã giao thành công" : "Đã hủy"

    const chuyentrang = () => {
        navigation.navigate('NotifiPage',
            {
                payment: item.payment,
                express: item.express,
                user: {
                    username: item.namePayOrder,
                    email: item.emailPayOrder,
                    phonenumber: item.phonenumberPayOrder,
                    address: item.addressPayOrder
                },
                title: 'THÔNG BÁO',
                totalCartsubmit: item.totalPrice,
                cartContext: [...item.listproduct],
                isSucces: isSucces
            })
    }


    const chuyenNgay = (miisecond) => {
        const date = new Date(Number(miisecond));
        const dayOfMonth = date.getDate(); // Lấy ngày trong tháng
        const month = date.getMonth() + 1; // Lấy tháng (tính từ 0)
        const year = date.getFullYear(); // Lấy năm
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `Ngày: ${dayOfMonth} / ${month} / ${year}, ${hour} : ${minute} : ${second}`
    }


    return (
        <TouchableOpacity
            onPress={chuyentrang}>
            <AppTextUnderLine
                textLeft={chuyenNgay(item.createdAt)}
                styleLeft={style.text}
            />

            <AppFlatListProductHome
                data={item.listproduct}
                number={1}
                renderitem={({ item }) =>
                    <RenderSearch
                        item={{
                            ...item,
                            isSucces:isSucces
                        }}
                        navigation={navigation}
                        type={'Notification'}
                    />}
            />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text: {
        ...styles.font2,
        fontSize: 16,
        lineHeight: 22,
        color: 'black'
    }
})

export default RenderDateNotifi
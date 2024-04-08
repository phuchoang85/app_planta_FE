import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../commond/AppStyles'

const RenderSingleHome = (props) => {
    const { item,navigation } = props
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail',{data: item, type: 'product'})}
            style={style.container}>
            <View style={{ marginVertical: 24, }}>
                <Text style={style.textNamePr}>{item.name}</Text>
                <Text style={style.content} numberOfLines={3}>{item.descripe}</Text>
            </View>

            <Image style={{ width: 108, height: 134, backgroundColor: '#d2d4d2', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignSelf: 'center' }}
                source={{ uri: item.imgs[0].img }} />

        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        paddingLeft: 24
    },
    textNamePr: {
        ...styles.font2,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    textproperties: {
        ...styles.font2,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    }
});

export default RenderSingleHome

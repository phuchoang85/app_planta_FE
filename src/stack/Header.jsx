import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButtonImage from '../../commond/AppButtonImage'
import styles from '../../commond/AppStyles'


const Header = (props) => {
    const { iconLeft, title, iconRight, eventLeft, eventRight } = props
    return (
        <View style={style.container}>
            {iconLeft ? <AppButtonImage
                styleimg={style.img}
                img={iconLeft}
                stylebutton={{}}
                event={eventLeft} /> :
                <View style={style.img} ></View>}

            <Text style={style.styleText} numberOfLines={1}>{title}</Text>

            {iconRight ? <AppButtonImage
                styleimg={style.img}
                img={iconRight}
                stylebutton={{}}
                event={eventRight} /> :
                <View style={style.img} ></View>}

        </View >
    )
}

const style = StyleSheet.create({
    styleText: {
        fontSize: 16,
        fontWeight: 'bold',
        ...styles.font2,
        maxWidth: 220
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 24,
        alignItems: 'center',
        ...styles.backgroundAll
    },
    img: {
        width: 30,
        height: 30,
    }
})

export default Header
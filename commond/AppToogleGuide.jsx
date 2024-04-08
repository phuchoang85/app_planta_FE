import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppFlatListProductHome from './AppFlatListProductHome'
import RenderDetailGuide from '../renderList/RenderDetailGuide'

const AppToogleGuide = (props) => {
    const { data, comment, styletext, imgShow, imgClose } = props
    const [ishow, setishow] = useState(false)

    return (
        <View>
            <TouchableOpacity
                onPress={() => setishow(!ishow)}
                style={style.container}>
                <Text style={styletext}>{comment}</Text>
                <Image style={style.icon} source={ishow ? imgClose : imgShow} />

            </TouchableOpacity>
            {
                ishow &&
                <AppFlatListProductHome
                    data={data}
                    number={1}
                    renderitem={({ item }) => <RenderDetailGuide item={item} />}
                />
            }
        </View>
    )
}

const style = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default AppToogleGuide
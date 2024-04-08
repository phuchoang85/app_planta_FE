import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'
import React, { useState } from 'react'

const RenderDetailGuide = (props) => {
    const { item } = props
    const [isshow, setisshow] = useState(false)
    return (
        <View style={{marginBottom: 15}}>
            <TouchableOpacity
                onPress={() => setisshow(!isshow)}
                style={style.container}>
                <Text style={style.styletext}>{item.title}</Text>
                <Image style={style.icon} source={isshow ? require('../resources/images/up.jpg') : require('../resources/images/down.jpg')} />
            </TouchableOpacity>
            {
                isshow &&
                <Text>
                    {item.content}
                </Text>
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
        alignItems: 'center',
        marginBottom: 15
    }
})

export default RenderDetailGuide
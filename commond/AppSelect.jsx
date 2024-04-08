import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './AppStyles'
import AppTextUnderLine from './AppTextUnderLine';


const AppSelect = (props) => {
    const { listSelect, selectType, setselectType, type,title } = props;

    const select = (id) => {
        if (selectType != id) {
            setselectType(id);
        }
    }

    const renderItem2 = ({ title, id, price, comment }) => {
        return (
            <TouchableOpacity
                onPress={() => select(id)}
                style={style.containerSelect} key={id}>
                <View>
                    <Text style={[style.text, { color: selectType == id ? '#007537' : '#221F1F' }]}>
                        {title} - {price}
                    </Text>
                    <Text style={[style.text, { color: '#7D7B7B' }]}>
                        {comment}
                    </Text>
                </View>
                {selectType == id ?
                    <Image style={style.icon} source={require('../resources/images/check.png')} /> :
                    <View></View>}


            </TouchableOpacity>
        )
    }

    const renderItem1 = ({ title, id }) => {
        return (
            <TouchableOpacity
            onPress={() => select(id)}
            style={style.containerSelect} key={id}>
            <View>
                <Text style={[style.text, { color: selectType == id ? '#007537' : '#221F1F' }]}>
                    {title} 
                </Text>
            </View>
            {selectType == id ?
                <Image style={style.icon} source={require('../resources/images/check.png')} /> :
                <View></View>}


        </TouchableOpacity>
        )
    }


    return (
        <View>
            <AppTextUnderLine
               textLeft={title}
               styleLeft={style.textTitle}/>
            {listSelect?.map?.(type == 1 ? renderItem1 : renderItem2)}
        </View>
    )
}
const style = StyleSheet.create({
    text: {
        ...styles.font2,
        fontSize: 14,
        lineHeight: 20
    },
    containerSelect: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        borderBottomColor:'black',
        borderBottomWidth: 1,
        paddingBottom: 4.4,
    },
    icon: {
        width: 24,
        height: 24
    },
    textTitle: {
        ...styles.font2,
        fontSize: 16,
        lineHeight: 22,
        color: 'black',
        marginTop: 15,
    },
})

export default AppSelect

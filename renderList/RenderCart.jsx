import { StyleSheet, Text, View, Image } from 'react-native'
import React, {  useState } from 'react'
import styles from '../commond/AppStyles'
import CheckBox from '@react-native-community/checkbox'
import AppChangePrice from '../commond/AppChangePrice'
import Appbutton from '../commond/Appbutton'
import AppButtonImage from '../commond/AppButtonImage'

const RenderCart = (props) => {
    const { item, setismodal, setiditem, setcart, cart,debouncedUpdateCart} = props;
    const [toogleCheckbox, settoogleCheckbox] = useState(item.checkbox);
    const [count, setcount] = useState(item.count);

    const updateItem = async (status, value) => {

        switch (status) {
            case 'increase':
                setcount(count + 1)
                debouncedUpdateCart(count + 1, toogleCheckbox, item, cart)
                break;
            case 'decrease':
                if (count > 1) {
                    setcount(count - 1)
                    debouncedUpdateCart(count - 1, toogleCheckbox, item, cart)
                }
                break;
            case 'check':   
                
                settoogleCheckbox(value)
                debouncedUpdateCart(count, value, item, cart)
                break;
            default:
                break;
        }
    }

    return (
        <View style={style.container}>
            <CheckBox
                style={{ alignSelf: 'center', marginRight: 28 }}
                onValueChange={async (value) => {
                 await updateItem('check', value )
                } }
                value={toogleCheckbox} />
            <Image style={style.img} source={{ uri: item.product.imgs[0].img }} />
            <View style={{ flex: 1 }}>
                <View style={style.containername}>
                    <Text numberOfLines={1} style={[style.text, { fontSize: 16, flex: 6 }]}>{item.product.name}</Text>
                    <Text style={[style.text, { fontSize: 16, flex: 1 }]}>|</Text>
                    {item.product.prototy.length > 0 && <Text numberOfLines={1} style={[style.text, { fontSize: 16, flex: 5, color: '#7D7B7B' }]}>{item.product.prototy[0].title}</Text>}

                </View>
                <Text style={[style.text, { fontSize: 16, color: '#007537' }]}>{AppChangePrice(item.product.price)}đ</Text>
                <View style={style.containerBottom}>
                    <View style={style.containerQuantity}>
                        <AppButtonImage
                            styleimg={style.icon}
                            img={require('../resources/images/minus.jpg')}
                            stylebutton={{}}
                            event={() => updateItem('decrease')}
                        />
                        <Text style={[style.text, { fontSize: 14 }]}>{count}</Text>
                        <AppButtonImage
                            styleimg={style.icon}
                            img={require('../resources/images/plus.jpg')}
                            stylebutton={{}}
                            event={() => updateItem('increase')}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Appbutton
                            text={'Xóa'}
                            event={() => { setismodal(true); setiditem(item._id) }}
                            stylettext={style.textDelete}
                            styles={{ alignSelf: 'center' }}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    textDelete: {
        ...styles.font2,
        fontWeight: 'bold',
        lineHeight: 22,
        color: 'black',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: 'black'
    },
    containerBottom: {
        flexDirection: 'row',
        marginTop: 13
    },
    containerQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 86
    },
    containername: {
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        ...styles.font2,
        fontWeight: 'bold',
        lineHeight: 22,
        color: 'black'
    },
    img: {
        width: 77,
        height: 77,
        borderRadius: 8,
        marginRight: 15
    },
    container: {
        height: 107,
        width: '100%',
        paddingVertical: 15,
        flexDirection: 'row'
    }
})

export default RenderCart
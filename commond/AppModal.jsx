import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import Appbutton from './Appbutton'
import styles from './AppStyles'


const AppModal = (props) => {
    const { eventSucces, setismodal, ismodal, title, comment, } = props
    return (
        <Modal
        animationType='fade'
            visible={ismodal}
            transparent={true}>
            <View style={style.container}>
                <View style={style.containerModal}>
                    <Text style={style.texttitle}>
                        {title}
                    </Text >
                    <Text style={style.textconmment}>
                        {comment}
                    </Text>

                    <Appbutton
                        text='Đồng ý'
                        styles={style.buttonGreen}
                        event={() => {eventSucces(); setismodal(false);}}
                        stylettext={style.textButtonGreen} />
                    <Appbutton
                        text='Hủy bỏ'
                        styles={style.buttonCancel}
                        event={() => setismodal(false)}
                        stylettext={style.buttontexcancel} />
                </View>
            </View>

        </Modal>
    )
}

const style = StyleSheet.create({
    buttontexcancel: {
        fontSize: 16,
        ...styles.font2,
        color: 'black',
        lineHeight: 20,
        textDecorationLine: 'underline'
    },
    buttonCancel: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    textButtonGreen: {
        fontSize: 16,
        ...styles.font2,
        color: 'white',
        lineHeight: 22
    },
    buttonGreen: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#007537',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textconmment: {
        fontSize: 14,
        ...styles.font2,
        color: '#7D7B7B',
        lineHeight: 20
    },
    texttitle: {
        fontSize: 16,
        ...styles.font2,
        color: 'black',
        lineHeight: 20
    },
    containerModal: {
        backgroundColor: 'white',
        width: '95%',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(26, 27, 54, 0.36)',
        paddingHorizontal: 16,
        paddingVertical: 8.5,
    }
})

export default AppModal
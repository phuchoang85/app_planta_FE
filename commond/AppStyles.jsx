import { StyleSheet } from 'react-native'
import React from 'react'

export default styles = StyleSheet.create({
    font2:{
        fontFamily: 'Lato-Regular'
    },
    font1:{
        fontFamily: 'Poppins-Regular'
    },  
    textError:{
        color:'rgba(206,0,0,1)',
        fontSize: 11,
        fontWeight: '500'
    },
    textColor:{
        color: 'rgba(0,146,69,1)'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    buttonClick:{
        width: 'auto',
        height: 50,
        padding: 10,
        borderRadius: 15,
    },
    container:{
        backgroundColor: 'white',
        flex: 1
    },
    textbigsize:{
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: 'black'
    },
    textmediumsize:{
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    inputStyle:{
        width: 'auto',
        height: 46,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingLeft: 14
    },
    backgroundAll:{
        backgroundColor: 'white'
    }
})
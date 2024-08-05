import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from './AppStyles'
import product from '../filedata/product.json'


const AppSearch = (props) => {
    const { img, placeholder, value, setvalue, setisFocus, setpage,SearchProduct ,setdatapro} = props

    const historysearch = [
        {
          "id": 1,
          "name": "Allianora",
          "time": "4/11/2023"
        },
        {
          "id": 2,
          "name": "Kimmi",
          "time": "6/9/2023"
        },
        {
          "id": 3,
          "name": "Maryrose",
          "time": "6/20/2023"
        },
        {
          "id": 4,
          "name": "Jereme",
          "time": "4/14/2023"
        },
        {
          "id": 5,
          "name": "Sander",
          "time": "1/9/2024"
        }
      ];


    const enterSearch = () =>{
        if(value){
            setpage(1)
            SearchProduct(value,1)
        }else{
            setpage(1)
            setdatapro(historysearch)
        }
    }

    return (
        <View style={style.container}>
            <TextInput
                value={value}
                onChangeText={text => setvalue(text)}
                placeholder={placeholder}
                style={style.textSearch}
                onFocus={() => setisFocus(true)}
                onBlur={() => setisFocus(false)} 
                onSubmitEditing={enterSearch}/>
            <Image style={style.styleimg} source={img} />
        </View>
    )
}

const style = StyleSheet.create({
    styleimg: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 0,
    },
    textSearch: {
        ...styles.font2,
        fontSize: 18,
        fontWeight: 'bold',
        height: 55,
        width: '100%',
    },
    container: {
        borderBottomColor: 'black',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 33
    }
})

export default AppSearch


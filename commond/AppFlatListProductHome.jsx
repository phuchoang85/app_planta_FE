import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appbutton from './Appbutton';
import styles from './AppStyles';


const AppFlatListProductHome = (props) => {
    const { data, title, number, more, renderitem, styletitle,textEmpty,idcatalog,navigation } = props;

    return (
        <View style={{ paddingTop: title ? 30 : 0 }}>
            {title ? <Text style={styletitle ? styletitle : style.textTitle}>{title}</Text> : <View></View>}

            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderitem}
                numColumns={number}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View>
                        <Text style={[style.textEmpty,{alignSelf:'center',}]}>{textEmpty}</Text>
                    </View>)}
                contentContainerStyle={{ justifyContent: 'center' }}
            />

            {more ? <Appbutton
                text={'Xem thêm '  + title}
                styles={{}}
                event={() => navigation.navigate('Catalog', { idcatalog: idcatalog})}
                stylettext={style.textMore}
            /> : <View></View>}

        </View>
    )
}

const style = StyleSheet.create({
    textMore: {
        ...styles.font2,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'right',
        marginTop: 17,
        marginHorizontal: 15
    },
    textTitle: {
        ...styles.font2,
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        marginHorizontal: 15,
        marginBottom: 15,
    },textEmpty:{
        ...styles.font2,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
    }
})

export default AppFlatListProductHome
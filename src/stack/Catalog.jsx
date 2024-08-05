import { View, Text, StyleSheet, ScrollView, Alert, Animated } from 'react-native'
import React, { useCallback, useReducer, useRef, useState } from 'react'
import styles from '../../commond/AppStyles'
import Header from './Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AppFlatListCatalog from '../../commond/AppFlatListCatalog'
import RenderCatalog from '../../renderList/RenderCatalog'
import AppFlatListProductHome from '../../commond/AppFlatListProductHome'
import RenderProductHome from '../../renderList/RenderProductHome'
import CatalogApi from '../../api/CatalogApi'
import PrototyApi from '../../api/PrototyApi'

const Catalog = ({ route }) => {
    const { idcatalog } = route.params
    const navigation = useNavigation();

    const [selectprototies, setselectprototies] = useState("1");
    const [prototy, setprototy] = useState([]);
    const [page, setpage] = useState(1);
    const [namecatalog, setnamecatalog] = useState('Catalog')

    const getDataCatalog = async (page) => {
        const body = {
            id: idcatalog,
            limit: 10,
            page: page ? page : 1,
        }
        const result = await CatalogApi.getOneCatalog(body);

        if (result.status) {
            setnamecatalog(result.data.title);
            setprototy([{ _id: "1", title: "All" }, { _id: "2", title: "Hàng mới về" }, ...result.data.properties]);
            return result.data.products;
        } else {
            Alert.alert("Kiểm tra mạng của bạn");
            return [];
        }
    }

    const getNewCatalog = async (page) => {
        const body = {
            id: idcatalog,
            limit: 10,
            page: page ? page : 1,
        }
        const result = await CatalogApi.getNewCatalog(body);

        if (result.status) {
            return result.data.products;
        } else {
            Alert.alert("Kiểm tra mạng của bạn");
            return [];
        }
    }

    const getPrototywithID = async (idprototy, page) => {
        const body = {
            id: idprototy,
            limit: 10,
            page: page ? page : 1,
        }
        const result = await PrototyApi.getPrototyWithId(body);

        if (result.status) {
            return result.data.products;
        } else {
            Alert.alert("Kiểm tra mạng của bạn");
            return [];
        }
    }


    const first = async (state, action) => {

        switch (action.key) {
            case 'All':
                return [...action.data]
            case 'Hàng mới về':
                return [...action.data]
            case 'Update':
                return [...state._j, ...action.data]
            default:
                return [...action.data]
        }
    }

    const [selectpototy, setlistprototy] = useReducer(first, []);

    const eventGetData = async (title) => {
        setpage(1)
        if (title == "All") {
            const dataAllCatalog = await getDataCatalog();
            setlistprototy({ key: 'All', data: dataAllCatalog })
        } else if (title == "Hàng mới về") {
            const datanewCatalog = await getNewCatalog();
            setlistprototy({ key: 'Hàng mới về', data: datanewCatalog })
        } else {
            const datagetprototy = await getPrototywithID(title);
            setlistprototy({ key: title, data: datagetprototy });
        }
    }

    const updatescroll = async (data) => {
        setpage(page + 1)
        if (data.title == 'All') {
            const dataAllCatalog = await getDataCatalog(page + 1);
            setlistprototy({ key: 'Update', data: dataAllCatalog })
        } else if (data.title == "Hàng mới về") {
            const datanewCatalog = await getNewCatalog(page + 1);
            setlistprototy({ key: 'Update', data: datanewCatalog })
        } else {
            const datagetprototy = await getPrototywithID(data._id, page + 1);
            setlistprototy({ key: 'Update', data: datagetprototy });
        }
    }

    useFocusEffect(useCallback(() => {
        eventGetData("All")
    }, []))

    const animation = useRef(new Animated.Value(0)).current;

    const depositupAnimation = {
        opacity: animation.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        }),
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -100], // Adjust this value as needed
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    if (prototy.length == 0) {
        return (
            <View>
                <Text>Đang chạy</Text>
            </View>)
    }

    return (
        <View style={style.container}>

            <Header
                iconLeft={require('../../resources/images/arrowleft.jpg')}
                title={namecatalog}
                iconRight={require('../../resources/images/cart.png')}
                eventLeft={() => navigation.navigate('Home')}
                eventRight={() => navigation.navigate('Cart')}
            />


            <Animated.View style={[depositupAnimation,style.containerPrototy]}>
                <AppFlatListCatalog
                    data={prototy}
                    renderitem={({ item }) => {
                        return <RenderCatalog
                            item={item}
                            select={selectprototies}
                            setselect={setselectprototies}
                            eventGetData={eventGetData} />
                    }}
                />
            </Animated.View>


            <ScrollView style={{ paddingHorizontal: 24, paddingTop: 30 }}
                onScroll={async (el) => {
                    let a = el.nativeEvent.contentOffset.y;
                    let b = el.nativeEvent.contentSize.height;
                    let c = el.nativeEvent.layoutMeasurement.height;
                    animation.setValue(a)

                    if (a + c >= b) {
                        await updatescroll(prototy.find(ele => ele._id == selectprototies))
                    }
                }}>


                <AppFlatListProductHome
                    data={selectpototy._j}
                    number={2}
                    renderitem={({ item }) => {
                        return <RenderProductHome item={item}
                            navigation={navigation} />
                    }}
                />
            </ScrollView>



        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        ...styles.backgroundAll
    },
    containerPrototy: {
        position: 'absolute',
        top: 60,
        paddingHorizontal: 24 ,
        width: '100%',
        zIndex: 20
    }
})

export default Catalog
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../commond/AppStyles'
import Header from './Header'
import { useNavigation } from '@react-navigation/native'
import AppInputUnderLine from '../../commond/AppInputUnderLine'
import Appbutton from '../../commond/Appbutton'
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../helper/AxiosInstance'
import UserApi from '../../api/UserApi'
import { updateUser } from '../redux/reducer/ReducerUser'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const Editinformation = () => {
    const appReducer = useSelector((state) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showbuttonaddimg, setshowbuttonaddimg] = useState(false)
    const [username, setusername] = useState(appReducer.user.name);
    const [email, setemail] = useState(appReducer.user.email);
    const [address, setaddress] = useState(appReducer.user.address);
    const [phonenumber, setphonenumber] = useState(appReducer.user.phonenumber);
    const [avatar, setavatar] = useState(appReducer.user.avatar);

    const [erorname, seterorname] = useState('')
    const [eroremail, seteroremail] = useState('')
    const [eroraddress, seteroraddress] = useState('')
    const [erorphonenumber, seterorphonenumber] = useState('')

    const [click, setclick] = useState(1);

    const endEditUsername = () => {
        if (!username.trim()) {
            seterorname('Hãy nhập đầy đủ họ và tên');
        } else {
            seterorname('');
        }
        setclick(click + 1)
    }

    const endEditEmail = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?=.*[@])[A-Za-z\d@]+(\.[A-Za-z\d@]+)*\.[A-Za-z]+$/;

        if (!email.trim()) {
            seteroremail('hãy nhập đầy đủ email');
        } else if (!email.match(regex)) {
            seteroremail('hãy nhập đúng định dạng email email@gmai.com');
        } else {
            seteroremail('');
        }
        setclick(click + 1)
    }

    const endEditAddress = () => {
        if (!address.trim() || address.length < 10) {
            seteroraddress('Hãy nhập đầy đủ địa chỉ');
        } else {
            seteroraddress('');
        }
        setclick(click + 1)
    }

    const endEditPhoneNumber = () => {
        const regex = /(03 || 09)\\d[8]/

        if (!phonenumber.trim()) {
            seterorphonenumber('Hãy nhập đủ số điện thoại');
        } else if (!phonenumber.match(regex)) {
            seterorphonenumber('Hãy đúng định dạng số điện thoại 0**********');
        } else {
            seterorphonenumber('');
        }
        setclick(click + 1)
    }

    const commonoption = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
    }

    const cameraoption = {
        cameraType: 'front',
        saveToPhotos: true,
        ...commonoption,
    }

    const libaryoption = {
        selectionLimit: 10,
        ...commonoption
    }

    const openlibrary = async () => {
        const response = await launchImageLibrary(libaryoption);
        if (response?.assets) {
            await onUPloadCloud(response.assets)
        } else {
            Alert.alert('Có lỗi xảy ra')
        }
    }

    const onCamera = async () => {
        const response = await launchCamera(cameraoption)
        if (response?.assets) {
            console.log(response.assets)
            await onUPloadCloud(response.assets)
        } else {
            Alert.alert('Có lỗi xảy ra')
        }
    }




    const Update = async () => {
        const body = {
            email: email,
            name: username,
            phoneNumber: phonenumber,
            avatar: avatar,
            address: address,
            _id: appReducer.user._id,
        }
        const result = await UserApi.updateUser(body);
        if (result.status) {
            const udpatedata = {
                ...appReducer.user,
                ...body
            }

            dispatch(updateUser(udpatedata))
            Alert.alert('Cập nhật thành công')
        } else {
            Alert.alert('Lỗi')
        }
    }

    const onUPloadCloud = async (anh) => {
        const uri = anh[0].uri;
        const type = anh[0].type;
        const name = anh[0].fileName;
        const source = { uri, type, name }
        console.log(source)
        try {
            const data = new FormData()
            data.append('file', source);
            data.append('upload_preset', 'ml_default');
            data.append('cloud_name', 'dnodsjqql');

            const respone = await fetch('https://api.cloudinary.com/v1_1/dnodsjqql/image/upload', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: data
            })
            const newDtaa = await respone.json();
            Alert.alert('Đã up ảnh thành công ')
            setavatar(newDtaa.url)
        } catch (error) {
            console.log(error)
        }
        finally {
            setshowbuttonaddimg(false)
        }
    }
    return (

        <View style={style.container}>
            <Header
                title={'CHỈNH SỬA THÔNG TIN CÁ NHÂN'}
                iconLeft={require('../../resources/images/arrowLeft.jpg')}
                eventLeft={() => navigation.goBack()}
            />

            <View style={style.containerbody}>
                <TouchableOpacity onPress={() => setshowbuttonaddimg(!showbuttonaddimg)}>
                    <Image style={style.icon} source={{ uri: avatar }} />
                </TouchableOpacity>
                <Text style={style.text14}>
                    Thông tin sẽ được lưu cho lần mua kế tiếp.
                    Bấm vào thông tin chi tiết để chỉnh sửa.
                </Text>

                <View style={{ marginTop: 40 }}>
                    <AppInputUnderLine
                        placeholder={'tên khách hàng'}
                        value={username}
                        setvalue={setusername}
                        eror={erorname}
                        eventEndEdit={endEditUsername}
                        click={click}
                    />

                    <AppInputUnderLine
                        placeholder={'Nhập email'}
                        value={email}
                        setvalue={setemail}
                        eror={eroremail}
                        eventEndEdit={endEditEmail}
                        click={click}
                    />

                    <AppInputUnderLine
                        placeholder={'Nhập địa chỉ'}
                        value={address}
                        setvalue={setaddress}
                        eror={eroraddress}
                        eventEndEdit={endEditAddress}
                        click={click}
                    />

                    <AppInputUnderLine
                        placeholder={'Số điện thoại'}
                        value={phonenumber}
                        setvalue={setphonenumber}
                        eror={erorphonenumber}
                        eventEndEdit={endEditPhoneNumber}
                        click={click}
                    />
                </View>
            </View>

            <View style={style.containerBottom}>
                <Appbutton
                    text='LƯU THÔNG TIN'
                    styles={style.button}
                    event={Update}
                    stylettext={[style.text16, { color: 'white' }]}
                />
            </View>

            {
                showbuttonaddimg &&
                <View style={style.containerChoosseButton}>
                    <TouchableOpacity onPress={onCamera} style={{ backgroundColor: 'green', borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>
                            Chụp ảnh
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openlibrary} style={{ backgroundColor: 'green', borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>
                            Chọn từ thư viện
                        </Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

const style = StyleSheet.create({
    containerChoosseButton: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    containerBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 24,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007537',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    icon: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        borderRadius: 180,
        marginTop: 25,
        marginBottom: 40
    },
    container: {
        ...styles.backgroundAll,
        flex: 1,
    },
    containerbody: {
        paddingHorizontal: 48
    },
    text14: {
        color: '#7F7F7F',
        ...styles.font2,
        fontSize: 14,
        lineHeight: 20
    },
    text16: {
        ...styles.font2,
        fontSize: 16,
        color: 'black',
        lineHeight: 22,
    },
})

export default Editinformation
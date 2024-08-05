import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
<<<<<<< HEAD
        baseURL: 'http://quockhanh020924.id.vn:6868/'
=======
        // baseURL: 'http://192.168.10.48:6868/'
        baseURL: 'https://pdp201.quockhanh020924.id.vn/api/'
>>>>>>> 253f179ab4441a5df34a89b5599c0ddb6682ec59
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = await AsyncStorage.getItem('token');
            const token = '';
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;


import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../src/helper/AxiosInstance'


export default UserApi = {
    login: createAsyncThunk(
        'login',
        async (data, { rejectWithValue }) => {
            try {
                const result = await AxiosInstance().post('/login', data);

                if (result.status == true) {
                    const data = {
                        name: result.data.name,
                        email: result.data.email,
                        _id: result.data._id,
                        address: result.data.address,
                        avatar: result.data.avatar,
                        phonenumber: result.data.phoneNumber,
                    };
                    return data
                }
            } catch (error) {
                console.log(error)
                return rejectWithValue(error);
            }
        }
    ),
    register: async (data) => {
        try {
            const result = await AxiosInstance().post('/register', data);

            return result;
        } catch (error) {
            console.log(error)
            const response = error.response
            return response.data
        }
    },
    updateUser: async (body) => {
        try {
            console.log(body)
            const result = await AxiosInstance().post(`/cap-nhat-tai-khoan`, body);
            return result;
        } catch (error) {
            const response = error.response
            return response.data
        }
    }
}
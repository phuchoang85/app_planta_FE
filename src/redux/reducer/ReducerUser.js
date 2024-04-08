import {createSlice } from "@reduxjs/toolkit"
import UserApi from "../../../api/UserApi";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout: (state, action) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserApi.login.pending, (state, action) => {
            console.log("...Pending");
        });
        builder.addCase(UserApi.login.fulfilled, (state, action) => {
            console.log('success')
            state.user = action.payload;
        });
        builder.addCase(UserApi.login.rejected, (state, action) => {
            console.log("...Rejected");
        });
    }
})

export const {logout,updateUser} = userSlice.actions;
export default userSlice.reducer;
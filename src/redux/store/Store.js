import {  combineReducers, configureStore  } from "@reduxjs/toolkit";
import userReducer  from '../reducer/ReducerUser'
import { confirmReducer } from "../reducer/ReducerConfirmOrder";

import { persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-community/async-storage";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: userReducer,
    confirmOrder: confirmReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store
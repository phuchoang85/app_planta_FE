import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  totalPrice: 0,
};

const setConfirmOrder = createAction('setConfirmOrder ');
const setTotalPrice = createAction('setTotalPrice');

const confirmReducer = createReducer(initialState, builder => {
  builder
    .addCase(setConfirmOrder, (state, action) => {
      state.list = action.payload;
    })
    .addCase(setTotalPrice, (state, action) => {
      state.totalPrice = action.payload;
    })
    .addDefaultCase(state => {
      return state;
    });
});

export {confirmReducer, setConfirmOrder, setTotalPrice};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((_, index) => index !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "../../@types/types";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";


// console.log(getCartFromLS)
const cartData = getCartFromLS()

const initialState:CartSliceState = {
  totalPrice: cartData.reduce((sum:number, obj:CartItem) => obj.price + sum, 0),
  // items: JSON.parse(localStorage.getItem('cart')) || [],
  items: cartData,
};
console.log(cartData)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => index !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state:RootState) => state.cart;
export const selectTotalPrice = (state:RootState) => state.cart.totalPrice;

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "../../@types/types";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";


const cartData = getCartFromLS()

const initialState:CartSliceState = {
  totalPrice: calcTotalPrice(cartData),
  items: cartData,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => index !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
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

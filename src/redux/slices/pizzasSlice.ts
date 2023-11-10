import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action){
        state.pizzas = action.payload;
    }
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ category, sort }) => {
    const { data } = await axios.get(
      `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=${sort.filter}`
    );

    return data;
  }
);

const initialState = {
  pizzas: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.pizzas = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.pizzas = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

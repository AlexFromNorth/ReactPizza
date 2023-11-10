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
    [fetchPizzas.pending]: (state, action) => {
      console.log('Идет отправка запроса');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(state, 'Все окей');
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(state, 'Была ошибка');
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

import { CartItem, Sort, Status } from "./../../@types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { PizzaItem, PizzaSliceState } from "../../@types/types";

export const fetchPizzas = createAsyncThunk<
PizzaItem[],
  { category: number; sort: Sort }
>("pizza/fetchPizzasStatus", async ({ category, sort }, thunkAPI) => {
  const { data } = await axios.get<PizzaItem[]>(
    `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=${sort.filter}`
  );

  if (data.length === 0) {
    return thunkAPI.rejectWithValue("Пиццы пустые");
  }

  return thunkAPI.fulfillWithValue(data);
});

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.status = Status.ERROR;
    });
  },
});

export const selectPizzasData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

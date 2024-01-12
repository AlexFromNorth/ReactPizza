import { FilterSliceState, Sort } from '../../@types/types';
import { RootState } from '../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState:FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
    filter: "desc",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state:RootState) => state.filter
export const selectSort = (state:RootState) => state.filter.sort

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;

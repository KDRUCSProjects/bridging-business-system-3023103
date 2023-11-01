import { createSlice } from '@reduxjs/toolkit';

const products = createSlice({
  name: 'product',
  initialState: {
    searchedValue: null,
    filterValues: {
      color: null,
      category: null,
      rating: null,
      Price: {
        min: null,
        max: null,
      },
    },
  },
  reducers: {
    getSearchedProductValue: (state, action) => {
      state.searchedValue = action.payload;
    },
    getFilterProductValues: (state, action) => {
      state.filterValues.color = action.payload.color;
      state.filterValues.category = action.payload.price;
      state.filterValues.rating = action.payload.rating;
      state.filterValues.Price.min = action.payload.price.min;
      state.filterValues.Price.max = action.payload.price.max;
    },
  },
});

export const productActions = products.actions;
export default products;

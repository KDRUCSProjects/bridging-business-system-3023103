import { createSlice } from '@reduxjs/toolkit';

const isLogged = createSlice({
  name: 'islogged',
  initialState: {
    isLogged: false,
  },

  reducers: {
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
  },
});
export const isloggedActions = isLogged.actions;

export default isLogged;

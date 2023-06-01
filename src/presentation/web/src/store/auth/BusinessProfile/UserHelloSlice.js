import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: 'Business',
};

// set UserRole
const userHello = createSlice({
  name: 'userHello',
  initialState,
  reducers: {
    setHello: (state, action) => {
      state.hello = action.payload;
    },
  },
});
export const userHelloAction = userHello.actions;
export default userHello;

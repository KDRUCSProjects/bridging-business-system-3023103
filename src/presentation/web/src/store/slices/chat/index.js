import { createSlice } from '@reduxjs/toolkit';

const chatCredientials = createSlice({
  name: 'chat',
  initialState: {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    image: undefined,
    password: undefined,
    confirmPassword: undefined,
  },

  reducers: {
    setChatInfo(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    setChatImage(state, action) {
      state.image = action.image;
      console.log(state);
    },
  },
});
export const chatCredientialsActions = chatCredientials.actions;

export default chatCredientials;

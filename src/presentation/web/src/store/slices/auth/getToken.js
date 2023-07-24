import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('Token');
const auth = createSlice({
  name: 'auth',
  initialState: {
    token: userToken,
  },
});

export default auth;

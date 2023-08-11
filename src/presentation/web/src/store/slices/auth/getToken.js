import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('Token');
console.log('NEDED TOKEN', userToken);
const auth = createSlice({
  name: 'auth',
  initialState: {
    token: userToken,
  },
});

export default auth;

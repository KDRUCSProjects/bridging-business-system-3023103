import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// redux Toolkit
import checkoutSlice from './slices/checkout/checkout';

// Rtk Query
import BaseApi from './BaseApi';
// Store
const store = configureStore({
  reducer: {
    // redux-toolkit-reducers
    checkout: checkoutSlice.reducer,

    // Rtk -reducers
    [BaseApi.reducerPath]: BaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BaseApi.middleware),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// redux Toolkit
import userHello from './auth/BusinessProfile/UserHelloSlice';
import checkoutSlice from './checkout/checkout';

// Rtk Query
import BusinessProvider from './auth/Business';
// Store
const store = configureStore({
  reducer: {
    // redux-toolkit-reducers
    userHello: userHello.reducer,
    checkout: checkoutSlice.reducer,

    // Rtk -reducers
    [BusinessProvider.reducerPath]: BusinessProvider.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BusinessProvider.middleware),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };

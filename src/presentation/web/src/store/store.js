import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// redux Toolkit
import checkoutSlice from './slices/checkout/checkout';
import completeAuthSlice from './slices/auth/completeAuth';
import completeForgotPasswordSlice from './slices/auth/completeForgotPassword';
// Rtk Query
import BaseApi from './BaseApi';

const persistConfig = {
  key: 'persist-key',
  storage,
};
// Store
const store = configureStore({
  reducer: {
    // redux-toolkit-reducers
    checkout: checkoutSlice.reducer,
    completeAuth: persistReducer(persistConfig, completeAuthSlice.reducer),
    completeForgotPassword: persistReducer(completeForgotPasswordSlice.reducer),

    // Rtk -reducers
    [BaseApi.reducerPath]: BaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BaseApi.middleware),
});

const persistedStore = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { persistedStore, store, dispatch, useSelector, useDispatch };

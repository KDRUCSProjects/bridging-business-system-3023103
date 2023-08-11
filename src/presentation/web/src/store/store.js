import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { combineReducers } from 'redux';

// redux Toolkit
import checkoutSlice from './slices/checkout/checkout';
import completeAuthSlice from './slices/auth/completeAuth';
import completeForgotPasswordSlice from './slices/auth/completeForgotPassword';
import auth from './slices/auth/getToken';
import products from './slices/product/product';
import islogged from './slices/islogged';
import chatCredientials from './slices/chat';
// Rtk Query
import BaseApi from './BaseApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [BaseApi.reducerPath, products, auth],
};

const rootReducer = combineReducers({
  // redux-toolkit-reducers
  auth: auth.reducer,
  products: products.reducer,
  checkout: checkoutSlice.reducer,
  completeAuth: completeAuthSlice.reducer,
  completeForgotPassword: completeForgotPasswordSlice.reducer,
  islogged : islogged.reducer,
  chatCredientials:chatCredientials.reducer,
  // Rtk -reducers
  [BaseApi.reducerPath]: BaseApi.reducer,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

// Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(BaseApi.middleware),
});

const persistedStore = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { persistedStore, store, dispatch, useSelector, useDispatch };

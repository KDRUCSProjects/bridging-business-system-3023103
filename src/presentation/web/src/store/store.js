import { configureStore } from '@reduxjs/toolkit';
// redux Toolkit
import userHello from './auth/BusinessProfile/UserHelloSlice';

// Rtk Query
import BusinessProvider from './auth/Business';
// Store
const store = configureStore({
  reducer: {
    // redux-toolkit-reducers
    userHello: userHello.reducer,

    // Rtk -reducers
    [BusinessProvider.reducerPath]: BusinessProvider.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BusinessProvider.middleware),
});

export default store;

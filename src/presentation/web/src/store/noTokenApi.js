import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUri } from '../base';
import { allServices } from '.';

const noTokenApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUri,
  }),
  endpoints: (builder) => ({
    // -----------------------------Mutations-----------------------------
    // Auth
    LoginUser: builder.mutation(allServices.mutations.LoginUser),
    VerifyUser: builder.mutation(allServices.mutations.VerifyUser),
    RegisterUser: builder.mutation(allServices.mutations.RegisterUser),
    ForgotPasswordEmail: builder.mutation(allServices.mutations.ForgotPasswordEmail),
    VerifyPassword: builder.mutation(allServices.mutations.VerifyPassword),
    NewPassword: builder.mutation(allServices.mutations.NewPassword),
  }),
});

export default noTokenApi;

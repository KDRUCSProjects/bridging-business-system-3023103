import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUri } from '../base';
import { allServices } from '.';

const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUri,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
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
    Resetpassword: builder.mutation(allServices.mutations.Resetpassword),
    LogoutUser: builder.mutation(allServices.mutations.LogoutUser),

    // Profile
    CreateBusinesProfile: builder.mutation(allServices.mutations.CreateProfile),
    UpdateBusinesProfile: builder.mutation(allServices.mutations.UpdateProfile),

    // Product
    CreateProduct: builder.mutation(allServices.mutations.CreateProduct),
    UpdateProduct: builder.mutation(allServices.mutations.UpdateProduct),
    DeleteProduct: builder.mutation(allServices.mutations.DeleteProduct),
    // Rating Mutation
    CreateRating: builder.mutation(allServices.mutations.CreateRating),

    // Rating Mutation
    CreateContactMessage: builder.mutation(allServices.mutations.CreateContactMessage),

    // -----------------------------Queries-------------------------------
    // profile
    GetBusinessProfile: builder.query(allServices.queries.GetProfile),
    GetSpecificProfile: builder.query(allServices.queries.GetSpecificProfile),
    // contact
    AllContactMessage: builder.query(allServices.queries.AllContactMessage),

    // Product
    GetAllProducts: builder.query(allServices.queries.GetAllProducts),
    GetSpecificProduct: builder.query(allServices.queries.GetSpecificProduct),
    SearchProduct: builder.query(allServices.queries.SearchProduct),

    // category
    GetAllCategories: builder.query(allServices.queries.GetAllCategories),
    GetSpecificCategory: builder.query(allServices.queries.GetSpecificCategory),

    // User
    GetAllUsers: builder.query(allServices.queries.GetAllUsers),
    GetSpecificUser: builder.query(allServices.queries.GetSpecificUser),

    // color
    GetAllColors: builder.query(allServices.queries.GetAllColors),
    GetSpecificColor: builder.query(allServices.queries.GetSpecificColor),

    // advertisment
    GetAllAdvertisments: builder.query(allServices.queries.GetAllAdvertisments),
    GetSpecificAdvertisment: builder.query(allServices.queries.GetSpecificAdvertisment),

    // Ratting
    GetAllRattings: builder.query(allServices.queries.GetAllRattings),
    GetSpecificRatting: builder.query(allServices.queries.GetSpecificRatting),

    // Ratting
    GetAllOrders: builder.query(allServices.queries.GetAllOrders),
    GetSpecificOrder: builder.query(allServices.queries.GetSpecificOrder),
  }),
});

export default BaseApi;

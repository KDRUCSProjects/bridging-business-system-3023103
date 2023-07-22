import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUri } from '../base';
import { allServices } from '.';

const BaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
  endpoints: (builder) => ({
    // -----------------------------Mutations-----------------------------
    // Auth
    VerifyUser: builder.mutation(allServices.mutations.VerifyUser),
    RegisterUser: builder.mutation(allServices.mutations.RegisterUser),
    ForgotPasswordEmail: builder.mutation(allServices.mutations.ForgotPasswordEmail),
    VerifyPassword: builder.mutation(allServices.mutations.VerifyPassword),
    NewPassword: builder.mutation(allServices.mutations.NewPassword),

    // Profile
    CreateBusinesProfile: builder.mutation(allServices.mutations.CreateProfile),

    // Product
    CreateProduct: builder.mutation(allServices.mutations.CreateProduct),
    UpdateProduct: builder.mutation(allServices.mutations.UpdateProduct),
    DeleteProduct: builder.mutation(allServices.mutations.DeleteProduct),

    // -----------------------------Queries-------------------------------
    // profile
    GetBusinessProfile: builder.query(allServices.queries.GetProfile),

    // Product
    GetAllProducts: builder.query(allServices.queries.GetAllProducts),
    GetSpecificProduct: builder.query(allServices.queries.GetSpecificProduct),

    // category
    GetAllCategories: builder.query(allServices.queries.GetAllCategories),
    GetSpecificCategory: builder.query(allServices.queries.GetSpecificCategory),

    // User
    GetAllUsers: builder.query(allServices.queries.GetAllUsers),
    GetSpecificUser: builder.query(allServices.queries.GetSpecificUser),

    // color
    GetAllColors: builder.query(allServices.queries.GetAllColors),
    GetSpecificColor: builder.query(allServices.queries.GetSpecificColor),

  }),
});

export default BaseApi;

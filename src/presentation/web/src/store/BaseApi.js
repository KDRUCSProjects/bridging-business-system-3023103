import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUri } from '../base';
import { allServices } from '.';

const BaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
  endpoints: (builder) => ({
    // -----------------------------Mutations-----------------------------

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
  }),
});

export default BaseApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUri } from '../base';
import { allServices } from '.';

const BaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
  endpoints: (builder) => ({
    // Mutations
    BusinesProfileBuilder: builder.mutation(allServices.mutations.CreateProfile),

    // Queries
    getBusinessProfile: builder.query(allServices.queries.getProfile),
  }),
});

export default BaseApi;

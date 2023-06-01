import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import BusinessProfile From index

import BusinessAuth from '.';

const [BusinessProfile] = BusinessAuth;

const token = localStorage.getItem('accessToken');

export const Business = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-demoPath-url',
    prepareHeaders: (header) => {
      header.set('Authorization', `token ${token}`);
    },
  }),
  endpoints: (builder) => ({
    // Register Business
    BusinesProfileBuilder: builder.mutation(BusinessProfile.BusinessProfileService),
  }),
});

export default Business;

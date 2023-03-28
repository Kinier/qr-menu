import { RootState } from './../index';
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  tagTypes: ['Menu', 'User', 'Category', 'Item', 'Restaurant'],

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`, prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from the state
      const token = (getState() as RootState).users.access_token;
      if (token !== '') {
        // Add the JWT token to the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
})
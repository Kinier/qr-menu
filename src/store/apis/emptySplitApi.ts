import { RootState } from './../index';
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  tagTypes: ['Menu', 'Category', 'Item'],

  baseQuery: fetchBaseQuery({
     baseUrl: `${process.env.REACT_APP_API_URL}/` ,
  }),
  endpoints: () => ({}),
})
import { emptySplitApi } from './emptySplitApi'

type User = {
  email: string, 
  password: string, 
  restaurantId: number
}

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string }, { email: string, password: string }>({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: { email, password },
      }),

    }),
    profile: builder.query<User, void>({
      query: () => `auth/profile`
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useProfileQuery } = userApi
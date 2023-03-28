import { emptySplitApi } from './emptySplitApi';

export type Restaurant = {
    id: number,
    name: string,
    address: string,
    phone: string,
    qr?: string,
    // logo: string
}

export const restaurantApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllRestaurants: builder.query<Restaurant[], void>({
        //     query: () => `restaurant`,
        //     providesTags: ['Restaurant']
        // }),
        getRestaurantById: builder.query<Restaurant, void>({
            query: () => `restaurant`,
            providesTags: ['Restaurant']
        }),
        createRestaurant: builder.mutation({
            query: ({ description, name, photo }: { description: string, name: string, photo: string | File }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('photo', photo);
                return ({
                    url: `restaurant`,
                    method: 'POST',
                    body: formData, 

                })
            },
            invalidatesTags: ['Restaurant'],
        }),
        deleteRestaurant: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `restaurant/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Restaurant'],
        }),
        uploadFile: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/restaurant/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        changeRestaurant: builder.mutation({
            query: ({ restaurant }: { restaurant: { name: string, phone: string, address:  string } }) => {
                // const formData = new FormData();
                // formData.append('name', restaurant.name);
                // formData.append('phone', restaurant.phone);
                // formData.append('address', restaurant.address);
                return ({
                    url: `/restaurant`,
                    method: 'PATCH',

                    body: restaurant
                })
            },
            invalidatesTags: ['Restaurant'],
        }),
    }),
    overrideExisting: false,
})

export const { /*useGetAllRestaurantsQuery,*/ useCreateRestaurantMutation, useDeleteRestaurantMutation, useUploadFileMutation, useGetRestaurantByIdQuery, useChangeRestaurantMutation } = restaurantApi
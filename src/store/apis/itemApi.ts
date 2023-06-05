import { emptySplitApi } from './emptySplitApi';

export type Item = {
    id: number,
    name?: string,
    photo?: string,
    categoryId?: number,
    price?: number,
    description?: string
}

export const itemApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItemsByCategoryId: builder.query<Item[], number>({
            query: (categoryId: number) => `item/category/${categoryId}`,
            providesTags: ['Item']
        }),
        createItem: builder.mutation({
            query: ({ name, description, photo, categoryId, price }: { name: string, description: string, price: number, photo: File | string, categoryId: number }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('categoryId', `${categoryId}`); 
                formData.append('description', description);
                formData.append('price', `${price}`);
                formData.append('photo', photo);
                console.log(formData);

                return {
                    url: `item`,
                    method: 'POST',
                    body: formData, 
                }
            },
            invalidatesTags: ['Item'],
        }),
        deleteItem: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `item/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Item'],
        }),
        changeItem: builder.mutation({
            query: ({ id, item }: { id: number, item: { name: string, description: string, price: number, file: File | string } }) => {
                const formData = new FormData();
                formData.append('name', item.name);
                formData.append('description', item.description)
                formData.append('price', `${item.price}`)
                formData.append('photo', item.file);
                return ({
                    url: `/item/${id}`,
                    method: 'PATCH',

                    body: formData
                })
            },
            invalidatesTags: ['Item'],
        }),
        getItemById: builder.query<Item, number>({
            query: (id: number) => `item/${id}`
        }),
    }),
    overrideExisting: false,
})

export const { useGetAllItemsByCategoryIdQuery, useCreateItemMutation, useDeleteItemMutation, useChangeItemMutation, useGetItemByIdQuery  } = itemApi
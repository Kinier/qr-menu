import { emptySplitApi } from './emptySplitApi';

export type Category = {
    id: number,
    name?: string,
    photo?: string,
    menuId?: number,
}

export const categoryApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategoriesByMenuId: builder.query<Category[], number>({
            query: (menuId: number) => `category/menu/${menuId}`,
            providesTags: ['Category']
        }),
        createCategory: builder.mutation({
            query: ({ name, photo, menuId }: { name: string, photo: File | string, menuId: number }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('menuId', `${menuId}`);
                formData.append('photo', photo);
                console.log(formData);

                return {
                    url: `category`,
                    method: 'POST',
                    body: formData, 
                }
            },
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `category/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Category'],
        }),
        changeCategory: builder.mutation({
            query: ({ id, category }: { id: number, category: { name: string, file: File | string } }) => {
                const formData = new FormData();
                formData.append('name', category.name);
                formData.append('photo', category.file);
                return ({
                    url: `/category/${id}`,
                    method: 'PATCH',

                    body: formData
                })
            },
            invalidatesTags: ['Category'],
        }),
        getCategoryById: builder.query<Category, number>({
            query: (id: number) => `category/${id}`
        }),
    }),
    overrideExisting: false,
})

export const { useGetAllCategoriesByMenuIdQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useChangeCategoryMutation, useGetCategoryByIdQuery  } = categoryApi
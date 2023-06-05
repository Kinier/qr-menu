import { emptySplitApi } from './emptySplitApi';

export type Menu = {
    id: number,
    name: string,
    description: string,
    photo: string,
    establishmentId?: number,
    status: boolean
}

export const menuApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMenus: builder.query<Menu[], void>({
            query: () => {
                return `menu`
            },
            providesTags: ['Menu']
        }),
        getMenuById: builder.query<Menu, number>({
            query: (id: number) => `menu/${id}`
        }),
        changeStatus: builder.mutation({
            query: ({ id, status }: { id: number, status: boolean }) => ({ 
                url: `menu/${id}`,
                method: 'PATCH',
                body: { status: status },
            }),
            invalidatesTags: ['Menu'],
        }),
        createMenu: builder.mutation({
            query: ({ description, name, photo }: { description: string, name: string, photo: string | File }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('photo', photo);
                
                return ({
                    url: `menu`,
                    method: 'POST',
                    body: formData, 
            
                })
            },
            invalidatesTags: ['Menu'],
        }),
        deleteMenu: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `menu/${id}`,
                method: 'DELETE',
                body: { establishmentId: 1 }, 
            }),
            invalidatesTags: ['Menu'],
        }),
        uploadFile: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/menu/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        changeMenu: builder.mutation({
            query: ({ id, menu }: { id: number, menu: { name: string, description: string, file: File | string } }) => {
                const formData = new FormData();
                formData.append('name', menu.name);
                formData.append('description', menu.description);
                formData.append('photo', menu.file);
                return ({
                    url: `/menu/${id}`,
                    method: 'PATCH',

                    body: formData
                })
            },
            invalidatesTags: ['Menu'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetAllMenusQuery, useChangeStatusMutation, useCreateMenuMutation, useDeleteMenuMutation, useUploadFileMutation, useGetMenuByIdQuery, useChangeMenuMutation } = menuApi
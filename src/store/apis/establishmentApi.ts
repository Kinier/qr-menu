import { emptySplitApi } from './emptySplitApi';

export type Establishment = {
    id: number,
    name: string,
    address: string,
    phone: string,
    qr?: string,
    // logo: string
}

export const establishmentApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getEstablishmentById: builder.query<Establishment, void>({
            query: () => `establishment`,
            providesTags: ['Establishment']
        }),
        createEstablishment: builder.mutation({
            query: ({ description, name, photo }: { description: string, name: string, photo: string | File }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('photo', photo);
                return ({
                    url: `establishment`,
                    method: 'POST',
                    body: formData, 

                })
            },
            invalidatesTags: ['Establishment'],
        }),
        deleteEstablishment: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `establishment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Establishment'],
        }),
        uploadFile: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/establishment/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        changeEstablishment: builder.mutation({
            query: ({ establishment }: { establishment: { name: string, phone: string, address:  string } }) => {
                // const formData = new FormData();
                // formData.append('name', restaurant.name);
                // formData.append('phone', restaurant.phone);
                // formData.append('address', restaurant.address);
                return ({
                    url: `/establishment`,
                    method: 'PATCH',

                    body: establishment
                })
            },
            invalidatesTags: ['Establishment'],
        }),
    }),
    overrideExisting: false,
})

export const { /*useGetAllEstablishmentsQuery,*/ useCreateEstablishmentMutation, useDeleteEstablishmentMutation, useUploadFileMutation, useGetEstablishmentByIdQuery, useChangeEstablishmentMutation } = establishmentApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: 'contacts',
        params: { sort: 'created:desc' },
      }),
    }),
    getContactById: builder.query({
      query: (id) => `contact/${id}`,
    }),
    createContact: builder.mutation({
      query: (newContact) => ({
        url: 'contact',
        method: 'POST',
        body: newContact,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: 'DELETE',
      }),
    }),
    addTagsToContact: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contact/${id}/tags`,
        method: 'PUT',
        body: tags,
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useAddTagsToContactMutation,
} = contactsApi;

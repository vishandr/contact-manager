import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', 
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${apiKey}`);
      return headers;
    },
  }),
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
    addTags: builder.mutation({
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
  useAddTagsMutation,
} = contactsApi;

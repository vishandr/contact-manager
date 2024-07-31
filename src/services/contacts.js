import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1',
    baseUrl: '/api', // Используем путь, который настроен в прокси
    prepareHeaders: (headers) => {
      headers.set('Authorization', 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn');
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

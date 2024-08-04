import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';
const apiBaseUrl = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1'; // Абсолютный URL с прокси

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl, 
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
    assignTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contacts/${id}/tags`,
        method: 'PUT',
        body: { tags },
      }),
    }),
    updateContact: builder.mutation({
      query: ({ id, avatar_url, fields, is_important }) => ({
        url: `contact/${id}`,
        method: 'PUT',
        body: { avatar_url, fields, is_important },
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useAssignTagsMutation,
  useUpdateContactMutation
} = contactsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  'x-rapidapi-key': 'd5be05a4camsh2ad67d45ecaacdap157783jsn2fc82a24ebf1',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoHeaders,
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
  },
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', cryptoHeaders['x-rapidapi-key']);
      headers.set('x-rapidapi-host', cryptoHeaders['x-rapidapi-host']);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/stats"),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
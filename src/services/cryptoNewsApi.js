import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  'x-rapidapi-key': 'd5be05a4camsh2ad67d45ecaacdap157783jsn2fc82a24ebf1',
  'x-rapidapi-host': 'news-api14.p.rapidapi.com',
};

const baseURL = "https://news-api14.p.rapidapi.com/v2/search";

const createRequest = (url) => ({url,headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl: baseURL,}),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
        query:(newsCategory) => createRequest(`/articles?query=${newsCategory}&language=en`),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
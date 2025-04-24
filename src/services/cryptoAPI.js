import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  'x-rapidapi-key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({url,headers: cryptoHeaders});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl:baseURL}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins`),
    }),
  }),
});

// const cryptoHeaders = {
//     'x-cg-demo-api-key': 'CG-9ik8xbyyrdC3LZEGbMaAvDBD',
//   };

//   const createRequest = (url) => ({url,headers: cryptoHeaders});

// const baseURL = "https://api.coingecko.com/api/v3";

// export const cryptoApi = createApi({
//     reducerPath: 'cryptoApi',
//     baseQuery: fetchBaseQuery({baseUrl: baseURL,}),
//     endpoints: (builder) => ({
//       getCryptos: builder.query({
//         query: () => createRequest(`/coins/markets?vs_currency=usd`),
//       }),
//     }),
//   });
export const { useGetCryptosQuery } = cryptoApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoMainHeaders = {
        'x-cg-demo-api-key': 'CG-9ik8xbyyrdC3LZEGbMaAvDBD',
      };
    
const createRequest = (url) => ({url,headers: cryptoMainHeaders});
    
    const baseURL = "https://api.coingecko.com/api/v3";
    
    export const cryptoMainApi = createApi({
        reducerPath: 'cryptoMainApi',
        baseQuery: fetchBaseQuery({baseUrl: baseURL,}),
        endpoints: (builder) => ({
          getMainCryptos: builder.query({
            query: () => createRequest("/coins/markets?vs_currency=usd"),
          }),
          getAdditionalCryptos: builder.query({
            query: (coinID) => createRequest(`/coins/markets?vs_currency=usd&ids=${coinID}`),
          }),
        }),
      });

export const {useGetMainCryptosQuery ,useGetAdditionalCryptosQuery}=cryptoMainApi;
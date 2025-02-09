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
          getPriceHistory:builder.query({
            query: (coinID,days) => createRequest(`/coins/${coinID}/market_chart?vs_currency=usd&days=9&interval=daily`),
          }),
          getFrom_To: builder.query({
            query: ({ fromCurrency, toCurrency }) => createRequest(`/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}&precision=4`),
          }),
        }),
      });

export const {useGetMainCryptosQuery ,useGetAdditionalCryptosQuery,useGetPriceHistoryQuery,useGetFrom_ToQuery}=cryptoMainApi;
import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoHeaders={
	 'x-rapidapi-key': '1889703e1fmsh462f32ef77b3fcbp1b58c5jsn0f9fa04cec19',
   'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseURL="https://coinranking1.p.rapidapi.com";

const createRequest=(url)=>{
    return {url,headers:cryptoHeaders}
}
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseURL}),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: () => "/",
      }),
    }),
  })


export const{useGetCryptosQuery}=cryptoApi;

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/stats',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl'
//   },
//   headers: {
//     'x-rapidapi-key': '1889703e1fmsh462f32ef77b3fcbp1b58c5jsn0f9fa04cec19',
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//   }
// };
// const options = {
// 	method: 'GET',
// 	hostname: 'coinranking1.p.rapidapi.com',
// 	port: null,
// 	path: '/stats?referenceCurrencyUuid=yhjMzLPhuIDl',
// 	headers: {
// 		'x-rapidapi-key': 'd5be05a4camsh2ad67d45ecaacdap157783jsn2fc82a24ebf1',
// 		'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
// 	}
// };
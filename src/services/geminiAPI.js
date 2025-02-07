import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://generativelanguage.googleapis.com/v1beta";

export const geminiApi = createApi({
    reducerPath: "geminiApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getCryptoInfo: builder.query({
          query: (prompt) => ({
            url: `/models/gemini-1.5-flash:generateContent?key=AIzaSyAr9Azi0PGIadM9oMAfuytqNw92gdSSfQo`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Give information about ${prompt} cryptocurrency`,
                    },
                  ],
                },
              ], 
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              description: `${prompt} Cryptocurrency Information`,
              type: "OBJECT",
              properties: {
                aboutCrypto: {
                  type: "STRING",
                  description: `What is ${prompt} in 5 lines`,
                  nullable: false,
                },
                itsValue: {
                  type: "STRING",
                  description: `Why does ${prompt} have value? A paragraph`,
                  nullable: false,
                },
                inflation: {
                  type: "STRING",
                  description: `No inflation in ${prompt}. A paragraph`,
                  nullable: false,
                },
                whobuilt: {
                  type: "STRING",
                  description: `Who built ${prompt}? A paragraph`,
                  nullable: false,
                },
                technology: {
                  type: "STRING",
                  description: `The technology of ${prompt}. A paragraph`,
                  nullable: false,
                },
              },
              required: [
                "aboutCrypto",
                "itsValue",
                "inflation",
                "whobuilt",
                "technology",
              ],
            },
          },
        }),
      }),
      transformResponse: (response) => {
        console.log("API response:", response);
        try {
            const text = response.candidates[0].content.parts[0].text;
             return JSON.parse(text);
        } catch (error) {
          console.log("Error parsing Gemini API response:", error);
        }
      },
    }),
    }),
});
export const { useGetCryptoInfoQuery } = geminiApi;


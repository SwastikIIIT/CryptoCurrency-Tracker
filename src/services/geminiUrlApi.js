import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseURL = "https://generativelanguage.googleapis.com/v1beta";

export const geminiUrlApi = createApi({
    reducerPath: "geminiUrlApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getUrlInfo: builder.query({
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
                      text: `Give links of ${prompt} cryptocurrency from different sources`,
                    },
                  ],
                },
              ], 
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              description: `${prompt} Cryptocurrency Links`,
              type: "OBJECT",
              properties: {
                github: {
                  type: "STRING",
                  description: `single github link in 1 line`,
                  nullable: false,
                },
                reddit: {
                  type: "STRING",
                  description: `single  reddit link in 1 line`,
                  nullable: false,
                },
                image: {
                  type: "STRING",
                  description: `url to an google image of the cryptocurrency`,
                  nullable: false,
                },
                wiki: {
                  type: "STRING",
                  description: `single wikipedia link in one line`,
                  nullable: false,
                },
                investopedia: {
                  type: "STRING",
                  description: `single investopedia link in one line`,
                  nullable: false,
                },
                youtube: {
                    type: "STRING",
                    description: `a youtube link for this cryptocurrency`,
                    nullable: false,
                  },
                twitter: {
                    type: "STRING",
                    description: `a twitter link for this cryptocurrency`,
                    nullable: false,
                },
                coindesk: {
                    type: "STRING",
                    description: `a coindesk link for this cryptocurrency`,
                    nullable: false,
                },
              },
              required: [
                "github",
                "reddit",
                "image",
                "wiki",
                "investopedia",
                "youtube",
                "twitter",
                "coindesk"
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
export const { useGetUrlInfoQuery } = geminiUrlApi;


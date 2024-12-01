import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = import.meta.env.VITE_API_KEY; 

// options
// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       lang: 'en',
//       engine: '2'
//     },
//     headers: {
//       'x-rapidapi-key': '',
//       'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };

// api key
export const articleApi = createApi({
  reducerPath: "articleApi",

  // base url and base query and headers
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com",

    // adding headers
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", key);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),

  // we will specify our endpoints
  endpoints: (builder) => ({
    // this builder will help us build our endpoints - lets just call it getSummary

    // redux creates a hook out of this endpoint
    getSummary: builder.query({
      // here we pass the query

      // encodeURIComponent() function encodes special characters that may be present in the parameter values
      // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug

      // we are passing some parameters here as well because we want to pass the url of the article and the length of the summary
      query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

// we are using Lazy here because we don't want to call the api until the user clicks on the button
export const { useLazyGetSummaryQuery } = articleApi;

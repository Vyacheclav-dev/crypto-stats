import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrls } from './urls'

const cryptoApiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrls.CRYPTO_API_BASE_URL }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => createRequest(apiUrls.GET_ASSETS)
    }),
    getPairs: builder.query({
      query: ({limit}: {limit: string}) => {
        return createRequest(`${apiUrls.GET_PAIRS}/${limit}`)
      }
    }),
    getPairsCount: builder.query({
      query: () => createRequest(apiUrls.GET_PAIRS_COUNT)
    }),
    getMarketsCount: builder.query({
      query: () => createRequest(apiUrls.GET_MARKETS_COUNT)
    }),
    getExchanges: builder.query({
      query: () => createRequest(apiUrls.GET_EXCHANGES)
    }),
    getCandlesticks: builder.query({
      query: ({ exchange, pair }: { exchange: string, pair: string }) => {
        return createRequest(`${apiUrls.GET_CANDLESTICKS}/${exchange}/${pair}`)
      }
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetPairsQuery,
  useGetPairsCountQuery,
  useGetMarketsCountQuery,
  useGetExchangesQuery,
  useGetCandlesticksQuery
} = cryptoApi
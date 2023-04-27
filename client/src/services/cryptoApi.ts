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
    })
  })
})

export const {
  useGetAssetsQuery
} = cryptoApi
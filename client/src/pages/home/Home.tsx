import React, { FC } from 'react'
import {
  useGetAssetsQuery,
  useGetExchangesQuery,
  useGetMarketsCountQuery,
  useGetPairsCountQuery
} from '../../services/cryptoApi'
import { Box } from '@mui/material'
import BackdropSpinner from '../../components/backdrop/BackdropSpinner'

const Home: FC = () => {
  const { data: exchanges, isLoading: isExchangesLoading } = useGetExchangesQuery('')
  const { data: assets, isLoading: isAssetsLoading } = useGetAssetsQuery('')
  const { data: pairsCount, isLoading: isPairsLoading } = useGetPairsCountQuery('')
  const { data: marketsCount, isLoading: isMarketsLoading } = useGetMarketsCountQuery('')

  if (isExchangesLoading || isAssetsLoading || isPairsLoading || isMarketsLoading)
    return <BackdropSpinner isOpen={true} />


  return (
    <Box sx={{
      'h1': {
        color: 'rgb(44, 175, 254)',
        fontSize: { xs: 22, md: 36 }
      }
    }}>
      <h1>{`API Total:`}</h1>
      <h1>{`-- Exchanges amount: ${exchanges?.length || 0}`}</h1>
      <h1>{`-- Assets amount: ${assets?.length || 0}`}</h1>
      <h1>{`-- Pairs amount: ${pairsCount?.result || 0}`}</h1>
      <h1>{`-- Markets amount: ${marketsCount?.result || 0}`}</h1>
    </Box>
  )
}

export default Home
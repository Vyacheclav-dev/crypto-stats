import React, { FC, useEffect, useState } from 'react'
import { useGetCandlesticksQuery, useGetExchangesQuery, useGetPairsQuery } from '../../services/cryptoApi'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import CandlesticksChart from './Chart'
import BackdropSpinner from '../../components/backdrop/BackdropSpinner'


const OHLCCandlesticks: FC = () => {
  const { data: exchanges, isLoading: isExchangesLoading } = useGetExchangesQuery('')
  const { data: pairs, isLoading: isPairsLoading } = useGetPairsQuery({ limit: '20' })

  const [exchangeParam, setExchangeParam] = useState<string>('')
  const [pairParam, setPairParam] = useState<string>('')
  const [skip, setSkip] = useState<boolean>(true)

  const [pair, setPair] = useState<string | number>('')
  const [exchange, setExchange] = useState<string | number>('')
  const [candle, setCandle] = useState<string | number>('')

  const { data: candlesticks, isLoading: isCandleLoading } = useGetCandlesticksQuery({
    exchange: exchangeParam,
    pair: pairParam
  }, {
    skip,
    selectFromResult: ({ data }) => ({
      data: data && {
        data: data.result && data.result['86400'] || null,
        error: data?.error
      }
    })
  })

  useEffect(() => {
    if (skip && exchanges?.length && pairs?.length) {
      const ex = exchanges?.find(ex => ex.name === 'Kraken')
      const pair = pairs?.find(p => p.symbol === 'btcusd')
      setSkip(false)
      setExchange(ex?.id)
      setPair(pair?.id)
      setCandle(1)
      setExchangeParam(ex?.name)
      setPairParam(pair?.symbol)
    }
  }, [exchanges, pairs])

  if (
    isExchangesLoading
    || isPairsLoading
    || isCandleLoading
    || !exchanges?.length && !pairs?.length
  ) return <BackdropSpinner isOpen={true} />


  const handleExchanges = (event: SelectChangeEvent<typeof Number>) => {
    const {
      target: { value }
    } = event
    const ex = exchanges.find(ex => ex.id === value)
    setExchange(ex?.id)
    setExchangeParam(ex?.name)
  }

  const handlePairs = (event: SelectChangeEvent<typeof Number>) => {
    const {
      target: { value }
    } = event
    const p = pairs.find(p => p.id === value)
    setPair(p?.id)
    setPairParam(p?.symbol)
  }

  const handleCandle = (event: SelectChangeEvent<typeof Number>) => {
    const {
      target: { value }
    } = event
    setCandle(value)
  }


  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h2>OHLC Candlesticks last 7 days</h2>

      <Box sx={{
        width: '100%',
        maxWidth: 1000,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        mb: 5
      }}>
        <Box sx={{ width: 250, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='exchange-label'>Exchange</InputLabel>
            <Select
              labelId='exchange-label'
              id='exchange-select'
              value={exchange}
              defaultValue={null}
              label='Exchange'
              onChange={handleExchanges}
            >
              {
                exchanges && exchanges.length > 0
                  ? exchanges.map((exchange: any) => (
                    <MenuItem value={exchange?.id} key={exchange?.id}>
                      {exchange?.name}
                    </MenuItem>
                  ))
                  : <MenuItem value={1} disabled>{'Choose exchange'}</MenuItem>
              }
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='exchange-label'>Pairs</InputLabel>
            <Select
              labelId='pairs-label'
              id='pairs-select'
              value={pair}
              label='Pairs'
              onChange={handlePairs}
            >
              {
                pairs && pairs.length > 0
                  ? pairs.map((pair: any) => (
                    <MenuItem value={pair?.id} key={pair?.id}>
                      {pair?.symbol}
                    </MenuItem>
                  ))
                  : <MenuItem value={1} disabled>{'Choose pair'}</MenuItem>
              }
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='candle-label'>Candle</InputLabel>
            <Select
              labelId='candle-label'
              id='candle-select'
              value={candle}
              label='Candle'
              onChange={handleCandle}
            >
              <MenuItem value={1}>{'OpenPrice'}</MenuItem>
              <MenuItem value={2}>{'HighPrice'}</MenuItem>
              <MenuItem value={4}>{'ClosePrice'}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {
        candlesticks && (
          <>
            {candlesticks.data?.length === 0 && <h1>No Data</h1>}
            {candlesticks?.error && <h1>{candlesticks.error}</h1>}
            {
              candlesticks.data?.length > 0 && <CandlesticksChart
                candlesticks={[...candlesticks.data]}
                candle={candle}
              />
            }
          </>
        )
      }
    </Box>
  )
}

export default OHLCCandlesticks
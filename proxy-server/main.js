import express from 'express'
import cors from 'cors'
import moment from 'moment'

const app = express()
const port = 4000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost']
}))

app.get('/assets', async (req, res) => {
  const response = await fetch('https://api.cryptowat.ch/assets', { mode: 'no-cors' })
  const result = await response.json()

  res.send(result['result'] || [])
})

app.get('/exchanges', async (req, res) => {
  const response = await fetch('https://api.cryptowat.ch/exchanges', { mode: 'no-cors' })
  const result = await response.json()

  res.send(result['result'] || [])
})

app.get('/pairs/:limit?', async (req, res) => {
  const limit = req.params.limit
  const response = await fetch(
    `https://api.cryptowat.ch/pairs${limit ? '?limit=' + limit : ''}`,
    { mode: 'no-cors' }
  )
  const result = await response.json()

  res.send(result?.result || [])
})

app.get('/pairs-count', async (req, res) => {
  await getTotalCount('pairs', req, res)
})

app.get('/markets-count', async (req, res) => {
  await getTotalCount('markets', req, res)
})

app.get('/candlesticks/:exchange/:pair', async (req, res) => {
  const { exchange, pair } = req.params
  let afterDate = new Date().toLocaleDateString().split('.')

  const bf = moment().add(1, "days")
  const af = moment().subtract(6, "days")

  let before = moment(bf, "DD.MM.YYYY").unix()
  let after = moment(af, "DD.MM.YYYY").unix()

  const response = await fetch(
    `https://api.cryptowat.ch/markets/${exchange}/${pair}/ohlc?after=${after}&before=${before}&periods=86400`,
    { mode: 'no-cors' }
  )
  const result = await response.json()

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const getTotalCount = async (url, req, res) => {
  let cursor = { hasMore: true, last: '' }
  let total = 0

  const getPairs = async (last) => {
    const response = await fetch(
      `https://api.cryptowat.ch/${url}${last ? '?cursor=' + last : ''}`,
      { mode: 'no-cors' }
    )
    return await response.json()
  }

  while (cursor.hasMore) {
    const res = await getPairs(cursor.last)
    cursor = res.cursor
    total += res?.result?.length || 0
  }

  res.send({ result: total })
}
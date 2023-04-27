import express  from 'express'
import cors from 'cors'
const app = express()
const port = 4000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost']
}))

app.get('/assets', async (req, res) => {
  const response = await fetch('https://api.cryptowat.ch/assets', {mode: 'no-cors'})
  const result = await response.json()

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
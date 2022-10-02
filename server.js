require('dotenv').config()
const express = require('express')
const db = require('./db/index')

const app = express()
// const morgan = require("morgan")

const PORT = process.env.PORT;

app.use(express.json())

app.get('/api/v1/restaurants', async (req, res) => {
  const results = await db.query("select * from restaurants")
  console.log(results)
  res.status(200).json({
    status: 'success',
    data: {
      results
    }
  })
})

app.get('/api/v1/restaurants/:id', (req, res) => {
  res.send(
    console.log(req.body)
  )
})

app.post('/api/v1/restaurants', (req, res) => {
  console.log(req.body)
})
app.put('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`)
})
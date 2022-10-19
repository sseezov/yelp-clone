require('dotenv').config()
const express = require('express')
const db = require('./db/index')
const cors = require('cors')

const app = express()
// const morgan = require("morgan")

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())

app.get('/api/v1/restaurants', async (req, res) => {

  try {
    const result = await db.query("select * from restaurants")
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        restaurants: result.rows
      }
    })
  }
  catch (e) {
    console.log(e)
  }

})

app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query(`select * from restaurants where id = $1`, [req.params.id])
    res.status(200).json({
      status: 'success',
      data: {
        restaurants: result.rows
      }
    })
  } catch (e) {
    console.log(e)
  }
})

app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const result = await db.query(`INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *`, [req.body.name, req.body.location, req.body.price_range])
    const restaurants = await db.query("select * from restaurants")
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    })
  } catch (e) {
    console.log(e)
  }
})

app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query(`UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *`, [req.body.name, req.body.location, req.body.price_range, req.params.id])
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    })
  } catch (e) {
    console.log(e)
  }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query(`DELETE FROM restaurants where id = $1`, [req.params.id])
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    })
  } catch (e) {
    console.log(e)
  }
})

app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`)
})

const hehehe = 'trying get the achievement/this is test'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import municipalityRoute from './routes/municipalityRoute.js'
import connectDB from './config/connectDB.js'

dotenv.config()
connectDB()
const app = express()

// Body parser
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/municipalities', municipalityRoute)

app.get('/', (req, res) => {
  res.send(
    'API made by ABChapagain! Send your request to /api/municipalities?lat={latitude}&lng={longitude}.'
  )
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  ;`App is listening on port ${PORT} on ${process.env.NODE_ENV} mode.`
})

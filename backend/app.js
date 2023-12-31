const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const path = require('path')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const itemsRouter = require('./controllers/items')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/items', middleware.userExtractor, itemsRouter)

//To fix client-side routing
app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'), (error) => {
    if (error) {
      response.status(500).send(error)
    }
  })
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

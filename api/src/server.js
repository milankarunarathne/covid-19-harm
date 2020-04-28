const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const cfg = require('../config')

const { statisticsRouter } = require('./routes/statistics')

const app = express()

MongoClient.connect(cfg.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  app.locals.db = client.db(cfg.dbName)
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }))

app.use('/statistics', statisticsRouter)

module.exports = app

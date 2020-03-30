const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const cfg = require('../config')

const app = express()

MongoClient.connect(cfg.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  app.locals.db = client.db(cfg.dbName)
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

module.exports = app


const express = require('express')
const StatisticsService = require('../services/StatisticsService')

const router = express.Router()

router.post('/create', async (req, res, next) => {
  const statisticsService = new StatisticsService(req.app.locals.db)
  const result = await statisticsService.saveStatistics(req.body)
  res.status(result.status).send(result.body)
})

module.exports = { statisticsRouter: router }

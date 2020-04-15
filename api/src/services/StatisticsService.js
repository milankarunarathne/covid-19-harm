const _ = require('lodash')
const ObjectID = require('mongodb').ObjectID

const StatisticsDb = require('../db/StatisticsDb')
const constants = require('../constants')

class StatisticsService {
  constructor(dbConn) {
    this.__statisticsDb = new StatisticsDb(dbConn)
  }

  async saveStatistics(statisticObj) {
    if (_.isEmpty(statisticObj)) {
      return {
        status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
        body: 'Required data missing'
      }
    }

    try {
      await this.__statisticsDb.saveDailyStatistic(statisticObj)

      return {
        status: constants.HTTP_STATUS_CODES.OK,
        body: {}
      }

    } catch (e) {
      console.error(e.message)
      return {
        status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        body: 'Internal Server Error'
      }
    }
  }

  async removeStatistics(id) {
    if (!ObjectID.isValid(id)) {
      return {
        status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
        body: 'Required ID is wrong'
      }
    }

    try {
      const result = await this.__statisticsDb.removeDailyStatistic(id)

      if (result === 0) {
        return {
          status: constants.HTTP_STATUS_CODES.GONE,
          body: 'Already Deleted or Doesn\'t Exist'
        }
      } else {
        return {
          status: constants.HTTP_STATUS_CODES.OK,
          body: 'Successfully Deleted'
        }
      }

    } catch (e) {
      console.error(e.message)
      return {
        status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        body: 'Internal Server Error'
      }
    }
  }
}

module.exports = StatisticsService

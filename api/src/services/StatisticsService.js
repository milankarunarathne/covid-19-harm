const _ = require('lodash');
const StatisticsDb = require('../db/StatisticsDb')
const constants = require('../constants')

class StatisticsService {
  constructor(dbConn) {
    this.__statisticsDb = new StatisticsDb(dbConn)
  }

  async saveStatistics(statistic) {
    if (_.isEmpty(statistic)) {
      return {
        status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
        body: 'Required data missing'
      }
    }

    try {

      await this.__statisticsDb.saveDailyStatistic(statistic)

      return {
        status: constants.HTTP_STATUS_CODES.OK,
        body: 'Successfully Inserted'
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

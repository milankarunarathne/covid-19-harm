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

  async getLatestStatistics() {
    try {
      const result = await this.__statisticsDb.getLatestDailyStatistic()
      // console.log(result)
      const dataResult = result[0]
      const generatedResult = {
        success: true,
        message: 'Success',
        data: {
          update_date_time: _.get(dataResult, 'update_date_time'),
          local_new_cases: _.get(dataResult, 'local_new_cases'),
          local_total_cases: _.get(dataResult, 'local_total_cases'),
          local_total_number_of_individuals_in_hospitals: _.get(dataResult, 'local_total_number_of_individuals_in_hospitals'),
          local_deaths: _.get(dataResult, 'local_deaths'),
          local_new_deaths: _.get(dataResult, 'local_new_deaths'),
          local_recovered: _.get(dataResult, 'local_recovered'),
          local_active_cases: _.get(dataResult, 'local_total_cases') - (_.get(dataResult, 'local_deaths') + _.get(dataResult, 'local_recovered')),
          global_new_cases: _.get(dataResult, 'global_new_cases'),
          global_total_cases: _.get(dataResult, 'global_total_cases'),
          global_deaths: _.get(dataResult, 'global_deaths'),
          global_new_deaths: _.get(dataResult, 'global_new_deaths'),
          global_recovered: _.get(dataResult, 'global_recovered'),
          global_active_cases: _.get(dataResult, 'global_total_cases') - (_.get(dataResult, 'global_deaths') + _.get(dataResult, 'global_recovered'))
        }
      }

      return {
        status: constants.HTTP_STATUS_CODES.OK,
        body: generatedResult
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
        body: 'Required ID is Wrong'
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

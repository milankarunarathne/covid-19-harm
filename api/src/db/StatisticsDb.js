const _ = require('lodash')
const ObjectID = require('mongodb').ObjectID
const constants = require('../constants')

class StatisticsDb {
  constructor(dbConn) {
    this.__dbConn = dbConn
  }

  async saveDailyStatistic(statistic) {
    try {
      const result = await this.__dbConn.collection(constants.COLLECTION_NAMES.DAILYSTATS)
        .insertOne(statistic)

      if (result) {
        return result
      }

    } catch (e) {
      if (e.code != '11000') {
        throw e
      }
    }
    return null
  }

  async removeDailyStatistic(id) {
    const result = await this.__dbConn.collection(constants.COLLECTION_NAMES.DAILYSTATS)
      .deleteOne({ _id: ObjectID(id) })

    if (result) {
      return _.get(result, 'deletedCount', 0)
    }
    return null
  }
}

module.exports = StatisticsDb

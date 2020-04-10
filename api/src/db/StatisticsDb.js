const constants = require('../constants')
// const ObjectID = require('mongodb').ObjectID

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
}

module.exports = StatisticsDb

const createRouter = require('../../lib/service-components/router')
const analytics = require('./analytics')

const actionFunctionMap = {
  TRACK_EVENT: analytics.trackEvent,
}

module.exports = createRouter(actionFunctionMap)
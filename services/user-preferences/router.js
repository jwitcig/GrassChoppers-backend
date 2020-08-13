const createRouter = require('../../lib/service-components/router')
const preferences = require('./preferences')

const actionFunctionMap = {
  GET_PREFERENCE: preferences.getPreference,
}

module.exports = createRouter(actionFunctionMap)
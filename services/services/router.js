const createRouter = require('../../lib/service-components/router')
const services = require('./services')

const actionFunctionMap = {
  LIST_SERVICES: services.listServices,
}

module.exports = createRouter(actionFunctionMap)
const createRouter = require('../../lib/service-components/router')
const users = require('./users')

const actionFunctionMap = {
  CREATE_USER: users.createUser,
  FIND_USER: users.findUser,
}

module.exports = createRouter(actionFunctionMap)
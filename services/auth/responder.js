const createResponder = require('../../lib/service-components/responder')

const responseActionMap = {
  CREATE_USER: 'USER_CREATED',
  FIND_USER: 'USER_FOUND',
}

module.exports = createResponder(responseActionMap)
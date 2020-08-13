const createResponder = require('../../lib/service-components/responder')

const responseActionMap = {
  LIST_SERVICES: 'LISTED_SERVICES',
}

module.exports = createResponder(responseActionMap)
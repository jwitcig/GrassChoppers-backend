const createResponder = require('../../lib/service-components/responder')

const responseActionMap = {
  GET_PREFERENCE: 'GOT_PREFERENCE',
}

module.exports = createResponder(responseActionMap)
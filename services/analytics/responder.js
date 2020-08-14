const createResponder = require('../../lib/service-components/responder')

const responseActionMap = {
  TRACK_EVENT: 'TRACKED_EVENT',
}

module.exports = createResponder(responseActionMap)
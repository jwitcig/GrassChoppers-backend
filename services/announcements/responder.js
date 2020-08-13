const createResponder = require('../../lib/service-components/responder')

const responseActionMap = {
  LIST_ANNOUNCEMENTS: 'LISTED_ANNOUNCEMENTS',
}

module.exports = createResponder(responseActionMap)
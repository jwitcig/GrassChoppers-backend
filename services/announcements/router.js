const createRouter = require('../../lib/service-components/router')
const announcements = require('./announcements')

const actionFunctionMap = {
  LIST_ANNOUNCEMENTS: announcements.listAnnouncements,
}

module.exports = createRouter(actionFunctionMap)
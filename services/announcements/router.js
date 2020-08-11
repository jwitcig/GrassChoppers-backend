const users = require('./announcements')

const actionFunctionMap = {
  LIST_ANNOUNCEMENTS: users.listAnnouncements,
}

module.exports.route = ({ action, ...args }) => {

  const func = actionFunctionMap[action]

  if (!func) {
    // unhandled message
    return null
  }
  return func(args)
}
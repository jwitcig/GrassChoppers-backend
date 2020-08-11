const users = require('./users')

const actionFunctionMap = {
  CREATE_USER: users.createUser,
  FIND_USER: users.findUser,
}

module.exports.route = ({ action, ...args }) => {

  const func = actionFunctionMap[action]

  if (!func) {
    // unhandled message
    return null
  }
  return func(args)
}
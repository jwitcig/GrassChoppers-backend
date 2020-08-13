module.exports = actionFunctionMap => ({
  route: ({ action, ...args }) => {
    const func = actionFunctionMap[action]

    if (!func) {
      // unhandled message
      return null
    }
    return func(args)
  },
})
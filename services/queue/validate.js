const isEmpty = value => value === null || value === undefined
const isNotEmpty = value => !isEmpty(value)
const isNotUndefined = value => isNotEmpty(value) || value === null

const validateMessage = message => {
  if (message.type === 'ENQUEUE') {
    return isNotUndefined(message.topic) && isNotEmpty(message.payload)
  } else if (message.type === 'SUBSCRIBE') {
    return isNotUndefined(message.topic)
  }
  return false
}

module.exports = {
  validateMessage
}
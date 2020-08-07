const isEmpty = value => value === null || value === undefined
const isNotEmpty = value => !isEmpty(value)

const validateMessage = message => {
  if (message.type === 'ENQUEUE') {
    return isNotEmpty(message.topic) && isNotEmpty(message.data)
  } else if (message.type === 'SUBSCRIBE') {
    return isNotEmpty(message.topic)
  }
  return false
}

module.exports = {
  validateMessage
}
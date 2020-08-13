const createClient = require('../../lib/queue-client/client')
const router = require('./router')
const responder = require('./responder')

const client = createClient()

client.setOnMessageReceived(message => {
  if (message.type === 'ACK' || message.type === 'MALFORMED') {
    return
  }

  const { payload } = message
  const result = router.route(payload)
  console.log(payload)

  if (result === undefined) {
    console.log('user-preferences: unsupported type')
    return
  }

  const response = responder(message, result)
  if (response) {
    client.sendMessage(response)
  } else {
    console.log('user-preferences: error: undefined response')
  }
})

client.connect('localhost', 4000, () => {
  client.subscribe({
    topic: null
  })
})
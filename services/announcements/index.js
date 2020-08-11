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

  if (!result) {
    console.log('announcements: unsupported type')
    return
  }

  const response = responder(message, result)
  if (response) {
    client.sendMessage(response)
  } else {
    console.log('announcements: error: undefined response')
  }
})

client.connect('localhost', 4000, () => {
  client.subscribe({
    topic: null
  })
})
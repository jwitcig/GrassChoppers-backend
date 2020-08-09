const net = require('net')
const createQueue = require('./queue')
const createSubscriberList = require('./subscribe')
const { createMessageHandler } = require('./message-handler')
const { splitPossibleMessages } = require('./utils')

const queue = createQueue()
const subscriptionList = createSubscriberList()

const PORT = 4000
const HOST = 'localhost'

const startServer = server => server.listen(PORT)

const sendMessage = (recipient, message) => {
  recipient.write(JSON.stringify(message))
}

const onDataReceived = (socket, messageHandler) => data => {
  splitPossibleMessages(data)
    .forEach(possibleMessageData => {
      try {
        const message = JSON.parse(possibleMessageData)
        messageHandler.handleMessage(message, sendMessage, socket)
      } catch(error) {
        console.log(error, possibleMessageData)
      }
    })
}

const onConnectionClosed = socket => () => {
  console.log('Connection closed')
}

const onErrorReceived = error => {
  console.log(error)
}

const messageHandler = createMessageHandler(queue, subscriptionList, sendMessage)

const server = net.createServer(socket => {
  socket.setEncoding('utf8')

  socket.on('error', onErrorReceived)
  socket.on('close', onConnectionClosed(socket))
  socket.on('data', onDataReceived(socket, messageHandler))
})

startServer(server)
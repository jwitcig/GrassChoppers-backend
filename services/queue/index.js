const net = require('net')
const createQueue = require('./queue')
const createSubscriberList = require('./subscribe')
const { createMessageHandler } = require('./message-handler')

const queue = createQueue()
const subscriptionList = createSubscriberList()

const PORT = 4000
const HOST = '127.0.0.1'

const startServer = server => server.listen(PORT, HOST)

const onDataReceived = (socket, messageHandler) => data => {
  try {
    const message = JSON.parse(data)
    console.log('received:', message)

    messageHandler.handleMessage(message, socket)
  } catch(error) {
    console.log(error)
  }
}

const onConnectionClosed = socket => () => {
  console.log('Connection closed')
}

const onErrorReceived = error => {
  console.log(error)
}

const processNextInQueue = (queue, subscriptionList) => {
  const task = queue.pop()
  if (!task) {
    return
  }

  console.log('executing:', task)

  const message = {
    id: task.id,
    topic: task.topic,
    data: task.data,
  }
  subscriptionList
    .getSubscriptions(task.topic)
    .forEach(subscription => {
      const { socket } = subscription.subscriber
      socket.write(JSON.stringify(message))
    })
}

const messageHandler = createMessageHandler(queue, subscriptionList)

const server = net.createServer(socket => {
  socket.setEncoding('utf8')

  socket.on('error', onErrorReceived)
  socket.on('close', onConnectionClosed(socket))
  socket.on('data', onDataReceived(socket, messageHandler))
})

startServer(server)

setInterval(() => {
  processNextInQueue(queue, subscriptionList)
}, 3000);
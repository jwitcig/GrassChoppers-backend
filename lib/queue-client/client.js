const net = require('net')

const { splitPossibleMessages } = require('./utils')

const createSendMessage = socket => message => {
  socket.write(JSON.stringify(message))
}

const createConnect = (socket, onMessageReceived) => (host, port, onConnected) => {
  socket.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`)
    onConnected()
  })

  socket.on('data', data => {
    splitPossibleMessages(data)
      .forEach(possibleMessageData => {
        try {
          const message = JSON.parse(possibleMessageData)
          onMessageReceived(message)
        } catch(error) {
          console.log(error)
        }
      })
  })

  socket.on('error', error => console.log(error))

  socket.on('close', () => {
    console.log('Connection closed')
  })
}

const createCloseConnection = socket => () => {
  socket.destroy()
}

const createSubscribe = sendMessage => ({ topic }) => {
  sendMessage({ type: 'SUBSCRIBE', id: 'id', topic })
}

module.exports = () => {
  const socket = new net.Socket()
  socket.setEncoding('utf8')

  const sendMessage = createSendMessage(socket)
  let _onMessageReceived

  return {
    connect: createConnect(socket, message => _onMessageReceived(message)),
    sendMessage: sendMessage,
    closeConnection: createCloseConnection(socket),
    setOnMessageReceived: onMessageReceived => _onMessageReceived = onMessageReceived,
    subscribe: createSubscribe(sendMessage),
  }
}

    // const data = {
    //   type: 'SUBSCRIBE',
    //   topic: 'some-topic'
    // }

    // client.write(JSON.stringify(data));

    // setTimeout(() => {

    //   const data = {
    //     type: 'ENQUEUE',
    //     data: {
    //       more: 'data',
    //       than: 'you',
    //     },
    //     topic: 'some-topic'
    //   }

    //   client.write(JSON.stringify(data));
    // }, 3000);
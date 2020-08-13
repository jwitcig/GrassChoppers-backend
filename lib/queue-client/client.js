const net = require('net')

const { splitPossibleMessages, generateID } = require('./utils')

const createSendMessage = (socket, senderID) => message => {
  const newMessage = {
    ...message,
    senderID,
    topic: message.topic || null,
  }

  console.log('sending:', newMessage)
  socket.write(JSON.stringify(newMessage))
}

const createConnect = (socket, onMessageReceived, conversations) => (host, port, onConnected) => {
  socket.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`)
    onConnected()
  })

  socket.on('data', data => {
    splitPossibleMessages(data)
      .forEach(possibleMessageData => {
        try {
          const message = JSON.parse(possibleMessageData)

          for (const conversation of Object.values(conversations)) {
            if (conversation.id === message.conversation_id) {
              conversation.pipe(message) 
              return
            }
          }

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

const startConversation = (sendMessage, id=null) => {
  const responseListener = createResponseListener()
  let _onMessageReceived
  
  if (!id) {
    id = generateID()
  }

  return {
    id,
    sendMessage: message => {
      sendMessage({
        conversation_id: id,
        ...message,
      })
      return {
        response: onMessageReceived => {
          _onMessageReceived = onMessageReceived
          return responseListener
        },
      }
    },
    pipe: message => {
      console.log('pipe:', message)
      if (message.conversation_id !== id) {
        return
      }
      if (_onMessageReceived) {
        _onMessageReceived(message)
        responseListener._capture(message)
      } else {
        console.log('else')
      }
    },
  }
}

const createResponseListener = () => {
  let _delegates = []
  const id = generateID()
  return {
    id,
    _attach: delegate => _delegates.push(delegate),
    _capture: response => _delegates.forEach(delegate => {
      console.log('response')
      delegate(id, response)
    }),
  }
}

const createWaiter = (...listeners) =>
  new Promise((resolve, reject) => {
    let responses = Array(listeners.length)
    var responseCount = 0
    const onResponseReceived = (listenerID, response) => {
      const index = listeners.findIndex(l => l.id === listenerID)
      responses[index] = response
      responseCount += 1
      console.log('onResponseReceived', responseCount, listeners.length, index, listenerID, responses)
      if (responseCount === listeners.length) {
        resolve(...responses)
      }
    }
    console.log(listeners)
    listeners.forEach(listener => listener._attach(onResponseReceived))
  })

const createCreateSagaStep = (startConversation) => (func, ...previousSteps) => {
  const conversation = startConversation()
  const responseListener = createResponseListener()

  const triggerMessage = (...inputs) => {
    const message = func(...inputs)
    return conversation
      .sendMessage(message)
      .response(message => {
        conversation.endConversation()
        responseListener._capture(message)
      })
  }

  if (previousSteps.length === 0) {
    triggerMessage()
  } else {
    createWaiter(...previousSteps.map(step => step.responseListener))
      .then((...inputs) => triggerMessage(...inputs))
  }
  
  return {
    responseListener,
    conversation,
  }
}

module.exports = () => {
  const socket = new net.Socket()
  socket.setEncoding('utf8')

  const sendMessage = createSendMessage(socket, generateID())
  const createConversation = () => {
    const conversation = startConversation(sendMessage)
    conversations[conversation.id] = conversation
    return {
      ...conversation,
      endConversation: () => delete conversations[conversation.id],
    }
  }
  const createSagaStep = createCreateSagaStep(createConversation)
  let _onMessageReceived

  let conversations = {}

  return {
    connect: createConnect(socket, message => _onMessageReceived(message), conversations),
    sendMessage: sendMessage,
    closeConnection: createCloseConnection(socket),
    setOnMessageReceived: onMessageReceived => _onMessageReceived = onMessageReceived,
    subscribe: createSubscribe(sendMessage),
    startConversation: createConversation(),
    createSagaStep: (func, ...listeners) => {
      const step = createSagaStep(func, ...listeners)
      conversations[step.conversation.id] = step.conversation
      return step
    },
    waitForSteps: (...sagaSteps) => createWaiter(...sagaSteps.map(step => step.responseListener)),
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
const createClient = require('./client')

const client = createClient()

client.setOnMessageReceived(message => {
  console.log(message)
})

client.connect('localhost', 4000, () => {
  client.sendMessage({ message: 'hey', id: 'some-id' })

  client.subscribe({ topic: 'thetopic' })

  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
  client.sendMessage({ type: 'ENQUEUE', data: 'sumn', topic: 'thetopic', id: 'asdf' })
})

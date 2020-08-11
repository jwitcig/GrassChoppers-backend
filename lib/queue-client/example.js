const createClient = require('./client')

const client = createClient()

client.setOnMessageReceived(message => {
  console.log(message)
})

client.connect('localhost', 4000, () => {

  client.sendMessage({
    type: 'ENQUEUE',
    payload: {
      action: 'CREATE_USER',
      email: 'jwitcig@gmail.com',
      password: 'test',
      name: 'Jonah Witcig',
    },  
    id: 'asdf',
    conversation_id: 'some_conversation_id',
  })
})

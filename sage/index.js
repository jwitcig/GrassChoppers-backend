const express = require('express')
const timeout = require('connect-timeout')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema')
const createResolvers = require('./resolvers')
const createClient = require('../lib/queue-client/client')

const app = express()
const client = createClient()
const apolloServer = new ApolloServer({ typeDefs, resolvers: createResolvers(client) })

const port = 3000
const queueSettings = {
  host: 'queue',
  port: 4000,
}

client.setOnMessageReceived(message => {
  if (message.type === 'ACK' || message.type === 'MALFORMED') {
    return
  }
})

client.connect(queueSettings.host, queueSettings.port, () => {
  client.subscribe({
    topic: null
  })
})

// 10 sec timeout
app.use(timeout(10000))
app.use((req, res, next) => {
  if (!req.timedout) {
    next()
  }
})

apolloServer.applyMiddleware({ app })

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
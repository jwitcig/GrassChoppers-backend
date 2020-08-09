const { validateMessage } = require('./validate')
const { generateID } = require('./utils')

const isValidMessage = validateMessage

// Sends an acknowledgement of having received a message.
// - sender: the original sender to respond to
// - inboundID: the temporary id that the sender assigned to the inbound message
// - id (optional): the id of the task created in response
const ack = (message, inboundID, id) => ({
  type: 'ACK',
  id: id,
  timestamp: Date(),
  inbound_id: inboundID || undefined,
  inbound_message_type: message.type,
})

const malformed = inboundID => ({
  type: 'MALFORMED',
  timestamp: Date(),
  inbound_id: inboundID || null,
})

const processNextInQueue = (queue, subscriptionList, sendMessage) => {
  const task = queue.pop()
  if (!task) {
    return
  }

  const message = {
    id: task.id,
    topic: task.topic,
    data: task.data,
  }
  subscriptionList
    .getSubscriptions(task.topic)
    .forEach(subscription => {
      const { subscriber } = subscription
      sendMessage(subscriber, message)
    })
}

const createMessageHandler = (queue, subscriptionList) => {
  return {
    handleMessage: (message, reply, sender) => {
      if (!isValidMessage(message)) {
        reply(sender, malformed(message.id))
        return
      }

      if (message.type === 'ENQUEUE') {
        const id = generateID()
        queue.push({
          id,
          topic: message.topic,
          data: message.data,
        })
        reply(sender, ack(message, message.id))
        console.log(queue.elements)
        processNextInQueue(queue, subscriptionList, reply)
      } else if (message.type === 'DEQUEUE') {
        
      } else if (message.type === 'SUBSCRIBE') {
        subscriptionList.push(sender, message.topic)

        reply(sender, ack(message, message.id))
        console.log(subscriptionList.getSubscriptions())
      }
    }
  }
}

module.exports = {
  createMessageHandler,
}
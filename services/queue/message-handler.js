const { validateMessage } = require('./validate')
const { generateID } = require('./utils')

const isValidMessage = validateMessage

// Sends an acknowledgement of having received a message.
// - sender: the original sender to respond to
// - inboundID: the temporary id that the sender assigned to the inbound message
// - id (optional): the id of the task created in response
const ack = (message, sender, inboundID, id) => {
  const response = {
    type: 'ACK',
    id: id,
    timestamp: Date(),
    inbound_id: inboundID || null,
    inbound_message_type: message.type,
  }  
  sender.write(JSON.stringify(response))
}

const createMessageHandler = (queue, subscriptionList) => {
  return {
    handleMessage: (message, socket) => {
      if (!isValidMessage(message)) {
        return
      }

      if (message.type === 'ENQUEUE') {
        const id = generateID()
        queue.push({
          id,
          topic: message.topic,
          data: message.data,
        })
        ack(message, socket, message.inbound_id)
        console.log(queue.elements)
      } else if (message.type === 'DEQUEUE') {
        
      } else if (message.type === 'SUBSCRIBE') {
        subscriptionList.push({
          socket,
          subcribedAt: Date(),
        }, message.topic)

        ack(message, socket, message.inbound_id, null)
        console.log(subscriptionList.getSubscriptions())
      }
    }
  }
}

module.exports = {
  createMessageHandler,
}
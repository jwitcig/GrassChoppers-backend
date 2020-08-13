const createSubscriberList = () => {
  let subscriptions = []

  return {
    push: (subscriber, subscriberID, topic) => {
      subscriptions.push({
        topic,
        subscriber,
        subscriberID,
        subscribedAt: Date(),
      })
    },
    getSubscriptions: topic => {
      if (!topic) {
        return subscriptions
      }
      return subscriptions.filter(subscription => subscription.topic === topic)
    },
  }
}

module.exports = createSubscriberList
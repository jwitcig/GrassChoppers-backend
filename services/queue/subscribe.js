const createSubscriberList = () => {
  let subscriptions = []

  return {
    push: (subscriber, topic) => {
      subscriptions.push({
        topic,
        subscriber,
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
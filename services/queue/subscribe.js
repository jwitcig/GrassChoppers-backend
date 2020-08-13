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
    unsubscribe: subscriber => subscriptions = subscriptions.filter(subscription => subscription.subscriber !== subscriber),
  }
}

module.exports = createSubscriberList
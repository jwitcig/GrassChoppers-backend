module.exports = {
  splitPossibleMessages: data => {
    let boundaryIndex = data.indexOf('}{')
    if (boundaryIndex === -1) {
      return [data]
    }

    let remainingData = data
    let possibleMessages = []
    while (boundaryIndex !== -1) {
      const splitIndex = boundaryIndex + 1
      possibleMessages.push(data.slice(0, splitIndex))
      data = data.slice(splitIndex)
      boundaryIndex = data.indexOf('}{')
    }
    return possibleMessages
  },
}
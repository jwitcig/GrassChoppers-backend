module.exports = {
  generateID: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  splitPossibleMessages: data => {
    let boundaryIndex = data.indexOf('}{')
    if (boundaryIndex === -1) {
      return [data]
    }

    let remainingData = data
    let possibleMessages = []
    while (boundaryIndex !== -1) {
      const splitIndex = boundaryIndex + 1
      possibleMessages.push(remainingData.slice(0, splitIndex))
      remainingData = remainingData.slice(splitIndex)
      boundaryIndex = remainingData.indexOf('}{')
    }
    possibleMessages.push(remainingData)
    return possibleMessages
  },
}
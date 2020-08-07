const createQueue = () => {
  let queue = []

  return {
    elements: queue,
    push: element => {
      queue.push(element)
    },
    next: () => queue[0],
    pop: () => queue.pop(),
  }
}

module.exports = createQueue
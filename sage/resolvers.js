module.exports = client => ({
  Query: {
    announcements: async () => {
      const listAnnouncements = client.createSagaStep(() => ({
        type: 'ENQUEUE',
        payload: {
          action: 'LIST_ANNOUNCEMENTS',
          user_id: 'jwitcig'
        },
        id: 'asdf',
      }))
      const response = await client.waitForSteps(listAnnouncements)
      return response.payload.data
    },
  },
})
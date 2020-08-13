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
    services: async () => {
      const listServices = client.createSagaStep(() => ({
        type: 'ENQUEUE',
        payload: {
          action: 'LIST_SERVICES',
          user_id: 'jwitcig'
        },
        id: 'asdf',
      }))
      const response = await client.waitForSteps(listServices)
      return response.payload.data
    },
    preference: async (parent, { preference_key }, context, info) => {
      const getPreference = client.createSagaStep(() => ({
        type: 'ENQUEUE',
        payload: {
          action: 'GET_PREFERENCE',
          preference_key,
        },
        id: 'asdf',
      }))
      const response = await client.waitForSteps(getPreference)
      return response.payload.data
    }
  },
})
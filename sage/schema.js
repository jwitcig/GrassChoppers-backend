const { gql } = require('apollo-server-express')

module.exports = gql`
  type Announcement {
    announcement_id: String
    title: String
    subtitle: String
  }

  type Service {
    service_id: String
    title: String
    description: String
  }

  type Query {
    announcements: [Announcement]
    services: [Service]
  }
`

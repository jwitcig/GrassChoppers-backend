module.exports.getPreference = ({ preference_key }) => {
  console.log('finding preference:', preference_key)

  if (preference_key === 'push_notifications') {
    return {
      preference_id: '12345678',
      preference_key: 'push_notifications',
      state: 'ENABLED',
    }
  } else if (preference_key === 'email_notifications') {
    return {
      preference_id: '87654321',
      preference_key: 'email_notifications',
      state: 'DISABLED',
    }
  }
  return null
}
module.exports.trackEvent = ({ event_name, user_id }) => {
  console.log('tracking event:', event_name)
  
  return {
    event_name,
    user_id,
  }
}
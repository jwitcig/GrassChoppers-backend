const responseActionMap = {
  CREATE_USER: 'USER_CREATED',
  FIND_USER: 'USER_FOUND',
}

module.exports = ({ id, conversation_id, payload: { action } }, responsePayload) => {
  const responseAction = responseActionMap[action]

  if (!responseAction) {
    // unhandled response
    return null
  }

  return {
    id,
    conversation_id,
    type: 'ENQUEUE',
    payload: {
      ...responsePayload,
      action: responseAction,
    },
  }
}
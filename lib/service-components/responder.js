module.exports = responseActionMap => ({ id, conversation_id, payload: { action } }, responsePayload) => {
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
      data: responsePayload,
      action: responseAction,
    },
  }
}
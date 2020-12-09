const initialState = null

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATED':
      return `Added new anecdote: ${action.data.content}`
    case 'VOTED':
      return `Voted ${action.data.content}`
    case 'FLUSH':
      return null
    default:
      return state
  }
}

export const created = (content) => {
  return {
    type: 'CREATED',
    data: { content }
  }
}

export const voted = (content) => {
  return {
    type: 'VOTED',
    data: { content }
  }
}

export const flush = () => {
  return {
    type: 'FLUSH'
  }
}
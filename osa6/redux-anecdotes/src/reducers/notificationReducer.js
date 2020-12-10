const initialState = null

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'FLUSH':
      return null
    default:
      return state
  }
}

export const setNotification = (msg, timeout) => {
  return async dispatch => {
    dispatch({    
      type: 'SET',
      data: msg 
    })    
    setTimeout(() => {
      dispatch({    
        type: 'FLUSH'
      })    
    }, timeout);


  }
}
export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      clearTimeout(state.timeoutID)
      return action.data
    case 'FLUSH':
      return ''
    default:
      return state
  }
}

export const setNotification = (msg, type) => {

  return async dispatch => {
    
    const timeoutID = setTimeout(() => {
      dispatch({    
        type: 'FLUSH'
      })    
    }, 4000);

    dispatch({    
      type: 'SET',
      data: { msg, type, timeoutID } 
    }) 

  }
}
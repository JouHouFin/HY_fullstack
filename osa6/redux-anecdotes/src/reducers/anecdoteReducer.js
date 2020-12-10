import { getAll } from '../services/anecdotes'


export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote )
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const create = (anecdote) => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const initNotes = (notes) => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({    
      type: 'INIT',
      data: anecdotes 
    })
  }
}
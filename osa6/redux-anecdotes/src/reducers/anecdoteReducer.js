import { getAll, createAnecdote, voteAnecdote } from '../services/anecdotes'

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id === id ? action.data : anecdote )
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = (anecdoteToVote) => {
  return async dispatch => {
    const anecdote = await voteAnecdote(anecdoteToVote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const create = (anecdoteContent) => {
  return async dispatch => {
    const anecdote = await createAnecdote(anecdoteContent)
    dispatch({    
      type: 'CREATE',
      data: anecdote
    })
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
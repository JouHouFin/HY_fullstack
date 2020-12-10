const getId = () => (100000 * Math.random()).toFixed(0)

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote )
    case 'CREATE':
      const newAnecdote = {
        content: action.data.content,
        id: action.data.id,
        votes: action.data.votes
      }
      return state.concat(newAnecdote)
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

export const create = (content) => {
  return {
    type: 'CREATE',
    data: { 
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initNotes = (notes) => {
  return {
    type: 'INIT',
    data: notes 
  }
}
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, create } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const dispatchVote = (id) => {
    dispatch(vote(id))
  }

  const createAnecdote = (e) => {
    e.preventDefault()
    dispatch(create(e.target.anecdoteContent.value))
    e.target.anecdoteContent.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatchVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdoteContent'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
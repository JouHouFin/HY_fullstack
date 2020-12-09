import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voted, flush } from '../reducers/notificationReducer'

export const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const dispatchVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(voted(anecdote.content))
    setTimeout(() => {
      dispatch(flush())
    }, 5000);
  }

  return (
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatchVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

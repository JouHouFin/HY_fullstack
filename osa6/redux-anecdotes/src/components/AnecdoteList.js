import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const regex = RegExp(filter, 'i');
  const filteredAnecdotes = anecdotes.filter(anecdote => regex.test(anecdote.content))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const dispatchVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`Voted '${anecdote.content}'`, 5000))
  }

  return (
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button style={{ marginLeft: 5 }} onClick={() => dispatchVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

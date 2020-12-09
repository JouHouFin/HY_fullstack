import React from 'react';
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''
    dispatch(create(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdoteContent'/></div>
        <button>create</button>
      </form>
    </div>
  )
}
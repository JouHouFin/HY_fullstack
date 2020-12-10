import React from 'react';
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { created, flush } from '../reducers/notificationReducer'
import { createAnecdote } from '../services/anecdotes'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''
    const newAnecdote = await createAnecdote(content)
    dispatch(create(newAnecdote))
    dispatch(created(content))
    setTimeout(() => {
      dispatch(flush())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdoteContent'/></div>
        <button>create</button>
      </form>
    </div>
  )
}
import React from 'react';
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''
    dispatch(create(content))
    dispatch(setNotification(`Created new anecdote: ${content}`, 5000))
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
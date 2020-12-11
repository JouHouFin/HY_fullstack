import React from 'react';
import { connect } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''
    props.create(content)
    props.setNotification(`Created new anecdote: ${content}`, 5000)
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

const mapDispatchToProps = { create, setNotification }

export const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
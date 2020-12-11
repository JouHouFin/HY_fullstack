import React from 'react'
import { connect } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const dispatchVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`Voted '${anecdote.content}'`, 5000)
  }

  return (
    anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  const regex = RegExp(state.filter, 'i');
  const filteredAnecdotes = state.anecdotes.filter(anecdote => regex.test(anecdote.content))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return {
    anecdotes: sortedAnecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

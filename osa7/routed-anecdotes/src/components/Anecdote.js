import React from 'react'
import { Link  } from "react-router-dom"

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      )}
    </ul>
  </div>
)

export const SingleAnecdote = ({ anecdote }) => (  
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>Has {anecdote.votes} votes</p>
    <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)
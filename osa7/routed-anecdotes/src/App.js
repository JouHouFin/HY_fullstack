import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"

import { AnecdoteList, SingleAnecdote } from './components/Anecdote'
import { CreateNew } from './components/CreateNew'
import { Notification } from './components/Notification'
import { About } from './components/About'
import { Menu } from './components/Menu'
import { Footer } from './components/Footer'

const App = () => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const match = useRouteMatch('/anecdotes/:id')  
  const anecdote = match     
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))    
    : null
  

  const [notification, setNotification] = useState('')
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setTimeout(() => {
      setNotification('')
    }, 10000);
    setNotification(`New anecdote '${anecdote.content}' by ${anecdote.author} added`)
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/anecdotes/:id'>
          <SingleAnecdote anecdote={anecdote} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />        

    </div>
  )
}

export default App;

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ConnectedAnecdoteForm } from './components/AnecdoteForm'
import { ConnectedAnecdoteList } from './components/AnecdoteList'
import { ConnectedFilter } from './components/Filter'
import { Notification } from './components/Notification'
import { initNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initNotes())  
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <ConnectedFilter />
      <ConnectedAnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App
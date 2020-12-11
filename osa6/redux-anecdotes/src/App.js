import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AnecdoteForm } from './components/AnecdoteForm'
import { ConnectedAnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
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
      <Filter />
      <ConnectedAnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
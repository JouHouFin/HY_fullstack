import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import App from './App'

const reducer = combineReducers({  blogs: blogReducer, notification: notificationReducer})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
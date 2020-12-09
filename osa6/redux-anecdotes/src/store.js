import reducer from './reducers/anecdoteReducer'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(reducer, composeWithDevTools())
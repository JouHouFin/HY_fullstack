import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (anecdote) => {
  const anecdoteObject = { content: anecdote, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const anecdoteObject = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdoteObject)
  return response.data
}
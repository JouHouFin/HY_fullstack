import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from './Blog'

test('component is rendered properly', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('title by author')
  expect(component.container).not.toHaveTextContent('url')
  expect(component.container).not.toHaveTextContent('Likes')
})

test('all details are shown when title is pressed', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: { username: 'username' }
  }
  const user = { username: 'username' }
  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const clickableTitle = component.getByText('title by author')
  fireEvent.click(clickableTitle)

  expect(component.container).toHaveTextContent('title by author')
  expect(component.container).toHaveTextContent('URL: url')
  expect(component.container).toHaveTextContent('Likes: 0')
})

test('two clicks to the addLike function results in two function calls', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: { username: 'username' }
  }
  const user = { username: 'username' }
  const mockAddLike = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} addLike={mockAddLike}/>
  )

  const clickableTitle = component.getByText('title by author')
  fireEvent.click(clickableTitle)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)
})
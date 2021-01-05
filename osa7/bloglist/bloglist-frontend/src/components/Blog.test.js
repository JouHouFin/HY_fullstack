import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog, BlogForm } from './Blog'

describe('single blog component tests', () => {
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
})

describe('blogform tests', () => {
  test('blogform calls the callback function with correct arguments', () => {
    const mockAddBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={mockAddBlog} />
    )
    
    const addBlogForm = component.container.querySelector('#addBlogForm')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'this should be the title' }
    })
    fireEvent.change(author, {
      target: { value: 'this should be the author' }
    })
    fireEvent.change(url, {
      target: { value: 'this should be the url' }
    })
    fireEvent.submit(addBlogForm)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe('this should be the title' )
    expect(mockAddBlog.mock.calls[0][0].author).toBe('this should be the author' )
    expect(mockAddBlog.mock.calls[0][0].url).toBe('this should be the url' )
  })
})
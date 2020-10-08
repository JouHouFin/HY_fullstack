import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    borderBottom: '2px solid black',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
    paddingLeft: '3px',
    width: '50%'
  }
  const titleStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#123478',
    paddingTop: '3px',
    marginBottom: '8px'
  }
  const buttonStyle = { border: '2px solid black', margin: '2px' }

  const addOneLike = () => {
    addLike(blog)
  }

  const deleteThis = () => {
    const result = window.confirm(`Remove blog "${blog.title} by ${blog.author}?`)
    if (result) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} >
      <h3 style={titleStyle} onClick={() => setDetailsVisible(!detailsVisible)}>{blog.title} by {blog.author}</h3>
      {detailsVisible ?
        <div>
          <span id="likes">Likes: {blog.likes} <button id="likeButton" style={buttonStyle} onClick={addOneLike} >Like</button><br /></span>
        URL: <a href={blog.url}>{blog.url}</a><br />
        Added by: {blog.user.name}<br />
          {user.username === blog.user.username ? <button style={buttonStyle} onClick={deleteThis}>Remove this blog</button> : null}
        </div>
        : null}
    </div>
  )}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

const Bloglist = ({ user, blogs, addLike, deleteBlog }) => {
  blogs.sort((a,b) => a.likes < b.likes ? 1 : -1)
  return (
    <div id="bloglist">
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} user={user} deleteBlog={deleteBlog} />)}
    </div>
  )
}

Bloglist.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogInput = useRef(null)
  const handleFocus = () => {
    blogInput.current.focus()
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    handleFocus()
  }

  return (
    <div>

      <h2>Add a blog</h2>
      <form id="addBlogForm" onSubmit={handleBlogAdd}>
        <div>
          Title:
          <input value={title}
            id="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}
            ref={blogInput}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            id="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Address:
          <input
            value={url}
            id="url"
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="addBlogButton" type="submit">Add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export { Blog, BlogForm, Bloglist }

import React, {useState, useRef} from 'react'

const Blog = ({ user, blog, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    borderBottom: "2px solid black", 
    borderLeft: "2px solid black", 
    borderRight: "2px solid black", 
    paddingLeft: "3px", 
    width: "50%"
  }
  const titleStyle = {
    fontWeight: "bold", 
    textDecoration: "underline", 
    color: "#123478", 
    paddingTop: "3px",
    marginBottom: "5px"
  }
  const buttonStyle = { border: "2px solid black", margin: "2px" }

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
    <p style={titleStyle} onClick={() => setDetailsVisible(!detailsVisible)}>{blog.title}</p>
    {detailsVisible ? 
      <div>
        Author: {blog.author}<br />
        Likes: {blog.likes} <button style={buttonStyle} onClick={addOneLike} >Like</button><br />
        URL: <a href={blog.url}>{blog.url}</a><br />
        Added by: {blog.user.name}<br />
        {user.username === blog.user.username ? <button style={buttonStyle} onClick={deleteThis}>Remove this blog</button> : null}
      </div> 
    : null}
  </div>
)}

const Bloglist = ({ user, blogs, addLike, deleteBlog }) => {
  blogs.sort((a,b) => a.likes < b.likes ? 1 : -1)
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} user={user} deleteBlog={deleteBlog} />)}
    </div>
  )
}

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogInput = useRef(null)
  const handleFocus = () => {
    blogInput.current.focus()
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    addBlog({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
    handleFocus()
  }

  return (
    <div>
      
      <h2>Add a blog</h2>
      <form onSubmit={handleBlogAdd}>
        <div>
          Title:
            <input value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
            ref={blogInput}
          />
        </div>
        <div>
          Author:
            <input
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Address:
            <input
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export {Blog, BlogForm, Bloglist }

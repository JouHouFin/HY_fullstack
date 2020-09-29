import React, {useState, useRef} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const Bloglist = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

const BlogForm = ({ user, setUser, blogs, setBlogs, hn }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogInput = useRef(null)
  const handleFocus = () => {
    blogInput.current.focus()
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(addedBlog))
      hn(`Blog "${title}" added successfully`, "success")
      setTitle('')
      setAuthor('')
      setUrl('')
      handleFocus()
    } catch (error) {
      hn(error.response.data.error, "error")
      handleFocus()
    }
    
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

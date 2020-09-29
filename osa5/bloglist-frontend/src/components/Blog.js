import React, {useState, useRef} from 'react'

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

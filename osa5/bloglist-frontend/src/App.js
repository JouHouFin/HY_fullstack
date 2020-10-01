import React, { useState, useEffect, useRef } from 'react'
import { BlogForm, Bloglist } from './components/Blog'
import { LoginForm, Notification, UserInfo } from './components/utils'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef(null)
  const loginInput = useRef(null)
  const handleFocus = () => {
    loginInput.current.focus()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleNotification = (msg, type) => {
    setNotification({ msg: msg, type: type })
    setTimeout(() => {
      setNotification(null)
    }, 4000);
  }

  const handleLogin = async (blogObject) => {
    try {
      const user = await loginService.login(blogObject)
      setUser(user)
      handleNotification("Login successful", "success")
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (error) {
      handleNotification("Wrong username or password", "error")
      handleFocus()
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      blogFormRef.current.toggleVisibility()
      handleNotification(`Blog "${blogObject.title}" added successfully`, "success")
    } catch (error) {
      handleNotification(error.response.data.error, "error")
    }
  }

  const addLike = async (blogObject) => {
    const likesPlusOne = {
      user: blogObject.user.id,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    }
    try {
      blogService.setToken(user.token)
      const updatedBlog = await blogService.update(likesPlusOne, blogObject.id)
      const newBlogs  = blogs.map(blog => blog.id === blogObject.id ? updatedBlog : blog)
      setBlogs(newBlogs)
      handleNotification(`+1 to "${blogObject.title}"`, "success")
    } catch (error) {
      handleNotification(error.response.data.error, "error")
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObject.id)
      const newBlogs  = blogs.filter(blog => blog.id !== blogObject.id)
      setBlogs(newBlogs)
      handleNotification(`Blog "${blogObject.title}" by ${blogObject.author} removed`, "success")
    } catch (error) {
      console.log(error)
      handleNotification(error.response.data.error, "error")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    handleNotification("Logout successful", "success")
  }

  return (
    <div>
      <h2>Blog app</h2>
      {notification === null ? <div><br/></div> : null}
      <Notification notification={notification} />
      {user === null ? null : <UserInfo user={user} logout={handleLogout}/>}
      {user === null ? <LoginForm login={handleLogin} loginInput={loginInput}/> : null}
      {user === null ? null : <Togglable buttonLabel='Add new blog' cancelLabel='Cancel' ref={blogFormRef}><BlogForm addBlog={addBlog} /></Togglable>}
      {user === null ? null : <Bloglist blogs={blogs} addLike={addLike} user={user} deleteBlog={deleteBlog}/>}
    </div>
  )
}

export default App
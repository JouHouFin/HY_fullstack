import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { BlogForm, Bloglist } from './components/Blog'
import { LoginForm, Notification, UserInfo } from './components/utils'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef(null)
  const loginInput = useRef(null)
  const handleFocus = () => {
    loginInput.current.focus()
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {  
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleNotification = (msg, type) => {
    dispatch(setNotification(msg, type))
  }

  const handleLogin = async (blogObject) => {
    try {
      const user = await loginService.login(blogObject)
      setUser(user)
      handleNotification('Login successful', 'success')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (error) {
      handleNotification('Wrong username or password', 'error')
      handleFocus()
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create( blogObject )
      console.log(addedBlog)
      dispatch(setBlogs(blogs.concat(addedBlog)))
      blogFormRef.current.toggleVisibility()
      handleNotification(`Blog "${blogObject.title}" added successfully`, 'success')
    } catch (error) {
      handleNotification(error.response.data.error, 'error')
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
      const newBlogs  = await blogs.map(blog => blog.id === blogObject.id ? updatedBlog : blog)
      dispatch(setBlogs(newBlogs))
      handleNotification(`+1 to "${blogObject.title}"`, 'success')
    } catch (error) {
      handleNotification(error.response.data.error, 'error')
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObject.id)
      const newBlogs  = blogs.filter(blog => blog.id !== blogObject.id)
      dispatch(setBlogs(newBlogs))
      handleNotification(`Blog "${blogObject.title}" by ${blogObject.author} removed`, 'success')
    } catch (error) {
      console.log(error)
      handleNotification(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    handleNotification('Logout successful', 'success')
  }

  return (
    <div>
      <h2 style={{ display: "inline-block", marginBottom: "25px" }}>Blog app</h2>
      <Notification notification={notification} />
      {user === null ? null : <UserInfo user={user} logout={handleLogout}/>}
      {user === null ? <LoginForm login={handleLogin} loginInput={loginInput}/> : null}
      {user === null ? null : <Togglable buttonLabel='Add new blog' cancelLabel='Cancel' ref={blogFormRef}><BlogForm addBlog={addBlog} /></Togglable>}
      {user === null ? null : <Bloglist blogs={blogs} addLike={addLike} user={user} deleteBlog={deleteBlog}/>}
    </div>
  )
}

export default App
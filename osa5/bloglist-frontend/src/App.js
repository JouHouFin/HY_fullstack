import React, { useState, useEffect, useRef } from 'react'
import { BlogForm, Bloglist } from './components/Blog'
import { LoginForm, Notification, UserInfo } from './components/utils'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

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



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      handleNotification("Login successful", "success")
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (error) {
      handleNotification("Wrong username or password", "error")
      handleFocus()
    }
  }

  return (
    <div>
      <h2>Blog app</h2>
      <Notification notification={notification} />
      {user === null ? null : <UserInfo user={user} setUser={setUser} hn={handleNotification}/>}
      {user === null ? <LoginForm un={username} setUn={setUsername} pw={password} setPw={setPassword} hl={handleLogin} loginInput={loginInput} /> : null}
      {user === null ? null : <BlogForm user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} hn={handleNotification} />}
      {user === null ? null : <Bloglist blogs={blogs} />}
    </div>
  )
}

export default App
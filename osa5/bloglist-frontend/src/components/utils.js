import React, { useState } from 'react'

const LoginForm = ({ login, loginInput }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login({username, password})
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
    <div>
      Username:
        <input autoFocus={true} 
          value={username}
          id="username"
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          ref={loginInput}
        />
    </div>
    <div>
      Password:
        <input
          value={password}
          id="password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type="submit">Log me in</button>
    </form>
  )
}

const Notification = ({ notification }) => {
  if (!notification) return null

  const style = notification.type === "error" ?
    { backgroundColor: "pink", border: "2px solid red", padding: "3px", width: "50%" } :
    { backgroundColor: "lightGreen", border: "2px solid green", padding: "3px", width: "50%" }
  return (
    notification === null ? null : <h4 style={style}>{notification.msg}</h4>
  )
}

const UserInfo = ({ user, logout }) => {
  return (
    <div>
      {user.name} is currently logged in <button onClick={logout}>Log me out</button>
    </div>
  )
}

export {LoginForm, Notification, UserInfo}
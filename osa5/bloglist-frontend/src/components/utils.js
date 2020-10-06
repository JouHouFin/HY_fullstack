import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, loginInput }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username, password })
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
      <button id="login-button" type="submit">Log me in</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginInput: PropTypes.object.isRequired
}

const Notification = ({ notification }) => {
  if (!notification) return null

  const style = notification.type === 'error' ?
    { paddingLeft: "5px", marginLeft: "10px", backgroundColor: 'red', border: '2px solid black', padding: '3px', width: '50%', display: "inline-block" } :
    { paddingLeft: "5px", marginLeft: "10px", backgroundColor: 'lightGreen', border: '2px solid black', padding: '3px', width: '50%', display: "inline-block" }
  return (
    notification === null ? null : <h4 id="notification" style={style}>{notification.msg}</h4>
  )
}

const UserInfo = ({ user, logout }) => {
  return (
    <div>
      {user.name} is currently logged in <button onClick={logout}>Log me out</button>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export { LoginForm, Notification, UserInfo }
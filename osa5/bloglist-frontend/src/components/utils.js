import React from 'react'

const LoginForm = ({ un, setUn, pw, setPw, hl, loginInput }) => {
  return (
    <form onSubmit={hl}>
    <div>
      Username:
        <input autoFocus={true} value={un}
          id="username"
          type="text"
          onChange={({ target }) => setUn(target.value)}
          ref={loginInput}
        />
    </div>
    <div>
      Password:
        <input
          value={pw}
          id="password"
          type="password"
          onChange={({ target }) => setPw(target.value)}
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

const UserInfo = ({user, setUser, hn}) => {
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    hn("Logout successful", "success")
  }

  return (
    <div>
      {user.name} is currently logged in <button onClick={handleLogout}>Log me out</button>
    </div>
  )
}

export {LoginForm, Notification, UserInfo}
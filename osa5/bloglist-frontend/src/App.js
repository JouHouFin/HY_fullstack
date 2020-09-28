import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({un, setUn, pw, setPw, hl}) => {
  return (
      <form onSubmit={hl}>
        <div>
          Username: 
            <input value={un} 
            id="username" 
            type="text" 
            onChange={({target}) => setUn(target.value)} 
          />
        </div>
        <div>
          Password: 
            <input 
            value={pw} 
            id="password" 
            type="password" 
            onChange={({target}) => setPw(target.value)} 
          />
        </div>
        <button type="submit">Log me in</button>
    </form>
  )
} 

const Bloglist = ({blogs}) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
} 

const BlogForm = ({user, setUser, title, setTitle, author, setAuthor, url, setUrl, handleBlogAdd}) => {
  return (
    <div>
      {user.name} is currently logged in <button onClick={() => {window.localStorage.clear(); setUser(null)}}>Log me out</button>
      <h2>Add a blog</h2>
      <form onSubmit={handleBlogAdd}>
        <div>
          Title: 
            <input value={title} 
            type="text" 
            onChange={({target}) => setTitle(target.value)} 
          />
        </div>
        <div>
          Author: 
            <input 
            value={author} 
            type="text" 
            onChange={({target}) => setAuthor(target.value)} 
          />
        </div>
        <div>
          Address: 
            <input 
            value={url} 
            type="text" 
            onChange={({target}) => setUrl(target.value)} 
          />
        </div>
        <button type="submit">Add</button>
    </form>
  </div>
  )
} 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("loggin in: ", username, password)
    try {
      const user = await loginService.login({username, password})
      console.log(user);
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (error) {
      alert("wrong credentials")
    }
  }
  const handleBlogAdd = async (event) => {
    event.preventDefault()
    console.log("adding blog: ", username, password)
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create({title, author, url})
      console.log(addedBlog)
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <h2>Blog app</h2>
      {user === null ? <LoginForm un={username} 
                                  setUn={setUsername} 
                                  pw={password} 
                                  setPw={setPassword} 
                                  hl={handleLogin} 
                        /> : null }
      {user === null ? null : <BlogForm user={user} 
                                        setUser={setUser} 
                                        title={title} 
                                        setTitle={setTitle} 
                                        author={author} 
                                        setAuthor={setAuthor} 
                                        url={url} 
                                        setUrl={setUrl} 
                                        handleBlogAdd={handleBlogAdd} 
                              /> } 
      {user === null ? null : <Bloglist blogs={blogs}/> } 
    </div>
  )
}

export default App
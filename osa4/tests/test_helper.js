const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const initialUsers = [
  {
    userName: "testUser1",
    name: "testName1",
    password: "testpw1"
  },
  {
    userName: "testUser2",
    name: "testName2",
    password: "testpw2"
  }
]

const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const allUsers = async () => {
  const users = await User.find({})
  return users.map(users => users.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, allBlogs, allUsers
}
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

const oneBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('totalLikes returns zero for empty list', () => {
    const emptyBlogList = []

    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })

  test('totalLikes for one blog is the number of likes for that blog', () => {
    const result = listHelper.totalLikes(oneBlogList)
    expect(result).toBe(5)
  })

  test('totalLikes returns total likes for multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {

  test('favoriteBlog for empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('favoriteBlog for one blog list is that blog', () => {
    const result = listHelper.favoriteBlog(oneBlogList)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('favoriteBlog returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result.likes).toEqual(12)
  })
})

describe('mostBlogs', () => {

  test('mostBlogs for empty list returns null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('mostBlogs for one blog list returns {author of that blog, one}', () => {
    const result = listHelper.mostBlogs(oneBlogList)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )
  })

  test('mostBlogs returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})

describe('mostLikes', () => {

  test('mostLikes for empty list returns null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('mostLikes for one blog list returns {author of that blog, likes of that blog}', () => {
    const result = listHelper.mostLikes(oneBlogList)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('mostLikes returns the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})
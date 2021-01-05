var _ = require('lodash')

const dummy = (blogs) => { // eslint-disable-line
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = blogs.reduce((acc, curr) => acc = curr.likes > acc ? curr.likes : acc, 0)
  const favBlog = blogs.find(blog => blog.likes === maxLikes)
  return (
    {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes
    }
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  if (blogs.length === 1) {
    return (
      {
        author: blogs[0].author,
        blogs: 1
      }
    )
  }

  const blogsPerAuthor = blogs.reduce((allAuthors, currBlog) => {
    if (currBlog.author in allAuthors) {
      allAuthors[currBlog.author]++
    } else {
      allAuthors[currBlog.author] = 1
    }
    return allAuthors
  }, {})

  const maxBlogs = _.max(_.values(blogsPerAuthor))
  const authorWithMaxBlogs = _.findKey(blogsPerAuthor, (val) => val === maxBlogs )

  return (
    {
      author: authorWithMaxBlogs,
      blogs: maxBlogs
    }
  )
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  if (blogs.length === 1) {
    return (
      {
        author: blogs[0].author,
        likes: blogs[0].likes
      }
    )
  }

  const likesPerAuthor = blogs.reduce((allAuthors, currBlog) => {
    if (currBlog.author in allAuthors) {
      allAuthors[currBlog.author] += currBlog.likes
    } else {
      allAuthors[currBlog.author] = currBlog.likes
    }
    return allAuthors
  }, {})

  const maxLikes = _.max(_.values(likesPerAuthor))
  const authorWithmaxLikes = _.findKey(likesPerAuthor, (val) => val === maxLikes )

  return (
    {
      author: authorWithmaxLikes,
      likes: maxLikes
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
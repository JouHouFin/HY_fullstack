const dummy = (blogs) => {
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

  const maxBlogs = Object.keys(blogsPerAuthor).reduce((a, b) => blogsPerAuthor[a] > blogsPerAuthor[b] ? blogsPerAuthor[a] : blogsPerAuthor[b])
  const authorWithMaxBlogs = Object.keys(blogsPerAuthor).find(key => blogsPerAuthor[key] === maxBlogs)

  return (
    {
      author: authorWithMaxBlogs,
      blogs: maxBlogs
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
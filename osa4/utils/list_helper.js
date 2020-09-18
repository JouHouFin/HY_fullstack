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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
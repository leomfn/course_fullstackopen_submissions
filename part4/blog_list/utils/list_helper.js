const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length == 1
    ? blogs[0].likes
    : blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((acc, item) => {
    return item.likes > acc
      ? item.likes
      : acc
  }, 0)

  return blogs
    .filter(blog => blog.likes === maxLikes)
    .map(blog => {
      return (
        {
          title: blog.title,
          author: blog.author,
          likes: blog.likes
        }
      )
    })[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
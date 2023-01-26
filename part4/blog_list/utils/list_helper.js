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

const mostBlogs = (blogs) => {

  // step 1: create array with an object for each author and count = 0

  const authorArray = blogs.reduce((arr, blog) => {
    if (!arr.map(element => element.author).includes(blog.author)) {
      console.log(`${blog.author} not found, added to array`)
      arr.push({ author: blog.author })
    }

    return arr
  }, [])

  console.log(authorArray)

  // step 2: add count to array from step 1, based on the occurences of each name in the blogs array

  const authorCountArray = authorArray.map((author) => {
    const result = blogs.filter((blog) => blog.author === author.author).length
    return { author: author.author, blogs: result }
  })

  console.log(authorCountArray)

  // step 3: find maximum count

  const maxBlogs = authorCountArray.reduce((obj, entry) => {
    return entry.blogs > obj.blogs
      ? {author: entry.author, blogs: entry.blogs}
      : obj
  }, {blogs: 0})

  console.log('maxBlogs', maxBlogs)

  return maxBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
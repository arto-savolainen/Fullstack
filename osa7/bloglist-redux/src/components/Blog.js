import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { updateBlogListState, likeBLog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('blogs/:id')
  const blog = match ? blogs.find(x => x.id === match.params.id) : null
  let bloglink = ''

  if (blog) {
    bloglink = [...blog.url].join('')

    //Prepend https:// to blog urls in case it's not there
    if (!bloglink.startsWith('http')) {
      bloglink = 'https://' + bloglink
    }
  }

  const deleteBlogButtonStyle = {
    display: 'inline-block',
    padding: '0.35em 1.2em',
    border: '0.1em solid #FFFFFF',
    margin: '0.3em 0.3em 0.3em 0',
    borderRadius: '10px',
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 300,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#e05353'
  }

  useEffect(() => {
    dispatch(updateBlogListState())
  }, [])

  const handleLikeClick = () => {
    dispatch(likeBLog(blog.id))
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      navigate('/blogs')
    }
  }

  if (!blog) {
    return <p>Blog not found</p>
  }

  return (
    <div>
      <h1 id='blog-title'>{blog.title} | {blog.author ? blog.author : 'Unknown author'}</h1>
      <div id='blog-url'><a href={bloglink} target='_blank' rel='noopener noreferrer'>{blog.url}</a></div>
      <div id='blog-likes'>{blog.likes} <button id='like-button' onClick={handleLikeClick}>like</button></div>
      <div id='blog-user'>added by {blog.user ? blog.user.name : 'Unknown user'}</div>
      <button id='delete-blog-button' style={deleteBlogButtonStyle} onClick={handleDeleteClick}>delete blog</button>
    </div>
  )
}

export default Blog
import React,{useEffect,useContext} from 'react'
import ArchiveBlog from './ArchiveBlog'
import BlogCard from './BlogCard'
import Search from './Search'
import blogContext from '../context/blogContext'


export default function GameBlog() {

  const blogApi = useContext(blogContext);

  useEffect(() => {
    blogApi.getBlog();
  //  eslint-disable-next-line
  }, [])
  

  return (
    <div>
      <Search/>
      <div className="blogs-container">
      {
      blogApi.blogs.map((e)=>{
        return <>
        {e.tag === "Games" && 
          <BlogCard  key={e._id} blog={e} title={e.title} description={e.description} tag={e.tag} />
        }
        </>
      })}
        </div>
    </div>
  )
}
import React, { useContext, useEffect } from 'react'
import BlogCard from './BlogCard'
import blogContext from '../context/blogContext'


export default function AllBlog() {

  const blogsApi = useContext(blogContext);







  useEffect(() => {

    blogsApi.getBlog();







    // eslint-disable-next-line
  }, [])



  return (
    <div className="blogs-container">
      {blogsApi.blogs.map((e) => {
        if(blogsApi.searchValue === ""){
          return <BlogCard key={e._id} blog={e} title={e.title} description={e.description} tag={e.tag} />
        }
        else if(blogsApi.searchValue.toLowerCase()  ===  e.tag.toLowerCase() || blogsApi.searchValue.toLowerCase() === e.title.toLowerCase()){
          return <BlogCard key={e._id} blog={e} title={e.title} description={e.description} tag={e.tag} />
        }else{
          return ""
        }
      })}

    </div>
  )
}

import React,{useEffect,useContext} from 'react'
import blogContext from '../context/blogContext'
import { useParams } from 'react-router-dom';

export default function SingleBlog(props) {

    const blogApi = useContext(blogContext);
    let paramId = useParams();
    
    useEffect(() => {
      
      blogApi.getSingleBlog(paramId.id)
      console.log(props.blogData);
      console.log(blogApi.singleBlog);
      console.log(paramId.id);
      // eslint-disable-next-line 
    }, [])
    
    
  return (
    <>
    <div className="container">
        {props.blogData}
    <div className='title'>{blogApi.singleBlog.title}</div>
    <div className='description'>{blogApi.singleBlog.description}</div>    
    </div>
    </>
  )
}

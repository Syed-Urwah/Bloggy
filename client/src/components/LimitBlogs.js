import React, { useEffect, useContext, useState } from 'react'
import blogContext from '../context/blogContext'
import BlogCard from './BlogCard'
import Search from './Search'
import Button from 'react-bootstrap/Button';

export default function LimitBlogs() {

    const blogApi = useContext(blogContext)
    let [page, setpage] = useState(1)
    let limit = 6;
    // page === (blogApi.countLimitBlog.length/limit) - limit
    let count = (blogApi.countLimitBlog.length+limit)/limit;



 

    useEffect(() => {

        blogApi.limitBlogs(page, limit);
        console.log(page);
        console.log(count);
        console.log(blogApi.page)
        // console.log(blogApi.countLimitBlog.length)
        // console.log(blogApi.page.next)
        // eslint-disable-next-line
    }, [page])

    const handleNext = () => {
        setpage(page + 1);
        console.log(page);
        // sendRequest();
        // blogApi.limitBlogs(page,3);
        console.log(blogApi.limitBlog)
    }
    const handlePrevious = () => {
        setpage(page - 1);
        console.log(page);
        // sendRequest();
        // blogApi.limitBlogs(page,3);
    }

    return (
        <div> <div>
            <Search />
        </div>
            <div className="blogs-container">
                {blogApi.limitBlog.map((e) => {
                    return <BlogCard blog={e} key={e._id} title={e.title} description={e.description} tag={e.tag} />
                })}
            </div>
            
            <div className='center-layout pagination'>
            {/* <button onClick={handlePrevious}>Previous</button> */}
            <Button disabled={page === 1} onClick={handlePrevious} variant="primary">Previous</Button>
            {/* <button onClick={handleNext}>next</button> */}
            <Button disabled={page === Math.ceil(blogApi.countLimitBlog/limit)} onClick={handleNext} variant="primary">Next</Button>
            </div>
        </div>
    )
}

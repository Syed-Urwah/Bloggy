import React, { useContext, useState, useEffect } from 'react'
import blogContext from '../context/blogContext'
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';



export default function Profile(props) {

    const naviagate = useNavigate();
    const [selectTheTag, setselectTheTag] = useState(false)

    //using context
    const blogApi = useContext(blogContext);
    const [addBlog, setAddBlog] = useState([{
        title: "",
        description: "",
        tag: ""
    }])



    useEffect(() => {

        if (!blogApi.isUser) {
            naviagate("/login");
        }
        blogApi.UserBlog();
        // handleAddBlog();
        // eslint-disable-next-line
    }, [])


    // const getValue = (e) => {
    //     setAddBlog({ ...addBlog, [e.target.name]: e.target.value });
    //     // console.log(addBlog);
    // }

    const getValue = () => {
        let title_value = document.getElementById("title").value
        let description_value = document.getElementById("description").value
        let tag_value = document.getElementById("tag").value


        setAddBlog({
            title: title_value,
            description: description_value,
            tag: tag_value,

        })

    }
    const getFile = (e) =>{
        console.log(e.target.files)
    }


    const handleAddBlog = (e) => {

        e.preventDefault();
        console.log(addBlog);
        blogApi.addBlog(addBlog);
    }

    function handleSelectTag(){
        setselectTheTag(true);
    }


    return (
        <>
            {blogApi.alert && <Alert key={blogApi.alert.type} variant={blogApi.alert.type}>
                {blogApi.alert.msg}
            </Alert>}




            <div className='create-blog-form'>
                <h1>Create a new Blog</h1>
                <form onSubmit={handleAddBlog}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input onChange={getValue} type="text" className="form-control form-control-title" name='title' id="title" aria-describedby="emailHelp" placeholder="Enter Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input onChange={getValue} type="text" className="form-control description" name='description' id="description" placeholder="Description" />
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control onChange={getFile} type="file" />
                        </Form.Group>
                        <label htmlFor="tag">Choose a Tag:</label>

                        <select onChange={getValue} onClick={handleSelectTag} name="tag" id="tag">
                            <option disabled = {selectTheTag}>Select</option>
                            <option value="nft">NFT</option>
                            <option value="tech">Tech</option>
                            <option value="Anime">Anime</option>
                            <option value="Games">Games</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Blog</button>
                </form>

            </div>


            <div className="blogs-container">
                {blogApi.userBlogs.map((e) => {
                    return <BlogCard key={e._id} blog={e} title={e.title} description={e.description} tag={e.tag} />
                            
                            
                })}

            </div>


        </>

    )
}

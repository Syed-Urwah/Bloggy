import React,{useState,useContext} from 'react'
import blogContext from '../context/blogContext';
import image from '../images/bg-img.jpg'
import profilieImage from '../images/profile-img.jpg'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SingleBlog from './SingleBlog';
import { useNavigate } from 'react-router-dom';

export default function BlogCard(props) {

    const location = useLocation();
    const navigate = useNavigate();

    const blogApi = useContext(blogContext)
    const [show, setShow] = useState(false);
    
    
    const description = props.description.slice(0,10) + "..."


   
    

    const handleModalShow = ()=>{
        // document.getElementById('title-update').value = "props.blog.title";
        setShow(true);
    }
    

    const handleClose = () => {
        setShow(false);
    }

    const [updateBlogs , setUpdateBlogs] =useState({
        etitle: "",
        edescription: "",
        eid: "" 
    })
    
    const getvalueUpdate = (e) => {

        let title_value = document.getElementById("title-update").value
        let description_value = document.getElementById("description-update").value
        // console.log(e.target.value)

        setUpdateBlogs({
            etitle: title_value,
            edescription: description_value,
            etag: "General",
            eid: props.blog._id
        })
        console.log(updateBlogs);
    }

    

    const editBlog = () => {
        console.log("edit");
        console.log(updateBlogs.eid);
        blogApi.updateBlog(updateBlogs.etitle,updateBlogs.edescription,updateBlogs.etag,updateBlogs.eid);
        setShow(false);
    }

    const handleDeleteBlog = () =>{
        console.log("deleting")
        blogApi.deleteBlog(props.blog._id);
    }
    const handleNavigate = () =>{
        navigate("/singleBlog/"+props.blog._id)
    }

    return (
        
        <>
        {location.pathname === '/singleBlog' && 
            <SingleBlog blogData={props.title}/>
        }

            {location.pathname === "/profile" &&
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                as="textarea"
                                autoFocus
                                id='title-update'
                                onChange={getvalueUpdate}
                            />
                        </Form.Group> */}
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" rows={3} id='title-update' onChange={getvalueUpdate} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} id='description-update' onChange={getvalueUpdate} />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editBlog}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
}
            <div className="blogs">
                <div>
                <img onClick={handleNavigate} className='blog-image' src={image} alt="" />
                {
                    location.pathname === "/profile" ? <div className='edit-card'>

                        <div className="blog-tag primary-color">{props.tag}</div>
                        <div>
                        <FontAwesomeIcon className='icon' onClick={handleModalShow} icon={faPenToSquare}></FontAwesomeIcon>
                        <FontAwesomeIcon className='icon' onClick={handleDeleteBlog} icon={faTrash}></FontAwesomeIcon>
                        </div>
                    </div>:<div className="blog-tag primary-color">{props.tag}</div>
                }
                
                
                <div onClick={handleNavigate} className="blog-title">{props.title}</div>
                <div onClick={handleNavigate} className="blog-description">{description}</div>

                <div className="user">
                    <img src={profilieImage} alt="" />
                    <div className="user-details">
                        {/* <div className="name">{props.user}</div> */}
                        <div className="time">jun 21, 2022</div>
                    </div>
                </div>
                </div>
            </div>

            </>


    )
}

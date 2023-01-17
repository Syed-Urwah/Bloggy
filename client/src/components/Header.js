import React, { useContext,useState } from 'react'
import { Link } from "react-router-dom";
import blogContext from '../context/blogContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/esm/Button';


export default function Header() {

    const blogApi = useContext(blogContext)
    const [clicked, setclicked] = useState(0)


    function handleMobileMenu() {
        const icon = document.getElementById('mobile-menu');
        if (clicked === 0) {
            icon.classList.remove('d-none');
            setclicked(()=> clicked + 1);
        }else{
            icon.classList.add('d-none');
            setclicked(()=> clicked - 1);
        }

    }
    function handlePage(){
        const icon = document.getElementById('mobile-menu');
        icon.classList.add('d-none');
        setclicked(()=>clicked - 1)
    }

    return (
        <div className="header-container">
            <header>
                <div className="left">
                    <Link to="/">
                        Bloggy
                    </Link>
                </div>

                <nav className="center">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>

                <div className="right">
                    {blogApi.isUser ? <>
                        <Link to="/logout">LogOut</Link>
                        <Link to="/profile">Profile</Link>
                    </> : <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link></>}



                    {/* <Link to="/login">Login</Link> */}
                </div>

                <FontAwesomeIcon id='ham' onClick={handleMobileMenu} className="hamburger" icon={faBars} />
            </header>

            <div id='mobile-menu' className="mobile d-none">
                    <div className="mobile-items">
                    <ul>
                        <li><Link onClick={handlePage} to="/">Home</Link></li>
                        <li><Link onClick={handlePage} to="/blogs">Blogs</Link></li>
                        <li><Link onClick={handlePage} to="/about">About</Link></li>
                        <li><Link onClick={handlePage} to="/contact">Contact</Link></li>
                    </ul>

                    <div className="profile">
                    {blogApi.isUser ? <>
                        <Button onClick={handlePage} variant='primary' to="/logout"><Link to='/logout'>Logout</Link></Button>
                        <Button onClick={handlePage} variant='primary' to="/profile"><Link to='/profile'>Profile</Link></Button>
                    </> : <>
                        <Button  onClick={handlePage}variant='primary' to="/login"><Link to='/login' >Login</Link></Button>
                        <Button onClick={handlePage} variant='primary' to="/signup"><Link to='/signup'>Signup</Link></Button></>}


                    </div>
                    </div>
            </div>
        </div>


    )
}

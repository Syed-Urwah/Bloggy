import React, { useContext } from 'react'
import {Link } from "react-router-dom";
import blogContext from '../context/blogContext';


export default function Header() {

    const blogApi = useContext(blogContext)

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
                {blogApi.isUser ?<>
                 <Link to="/logout">LogOut</Link>
                 <Link to="/profile">Profile</Link>
                  </>:<>
                 <Link to="/login">Login</Link>
                 <Link to="/signup">Signup</Link></> }
                
                {/* <Link to="/login">Login</Link> */}
            </div>
        </header>
        </div>

    )
}

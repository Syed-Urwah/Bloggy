import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import blogContext from '../context/blogContext';

export default function Search() {

  const location = useLocation();
  const blogApi = useContext(blogContext)

  function handleSearch (e){
    blogApi.setsearchValue(e.target.value)
  }

  return (
    <>


      <div className="bg-img">
        <h2>BLOG</h2>
        <input onChange={handleSearch} value={blogApi.searchValue} type="search" placeholder="Search" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="category">
        <ul>
          <li className={location.pathname === '/' || location.pathname === '/blogs' ? "active-category" : "s"}><Link to="/">All</Link></li>
          <li className={location.pathname === '/nft' ? "active-category" : "s"}><Link to="/nft">NFT</Link></li>
          <li className={location.pathname === '/tech' ? "active-category" : "s"}><Link to="/tech">Tech</Link></li>
          <li className={location.pathname === '/anime' ? "active-category" : "s"}><Link to="/anime">Anime</Link></li>
          <li className={location.pathname === '/games' ? "active-category" : "s"}><Link to="/games">Games</Link></li>
        </ul>
      </div>
    </>
  )
}

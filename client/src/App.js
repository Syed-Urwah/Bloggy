// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import AllBlog from './components/AllBlog';
import NftBlog from './components/NftBlog';
import TechBlog from './components/TechBlog';
import AnimeBlog from './components/AnimeBlog';
import GameBlog from './components/GameBlog';
import Home from './components/Home';
import Header from './components/Header';
import AddBlog from './components/AddBlog';
import BlogSate from './context/BlogState';
import About from './components/About';
import Contact from './components/Contact';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SingleBlog from './components/SingleBlog';
import LimitBlogs from './components/LimitBlogs';
// import limitNftBlogs from './components/limitNftBlogs';



function App() {


  return (
    <BlogSate>
      <BrowserRouter>

        <div className="container">
          <Header />
          <Routes>
            <Route exact path="/" element={<><Home /><AllBlog /></>} />
            <Route exact path="/blogs" element={<LimitBlogs/>} />
            {/* <Route exact path="/blogs" element={<limitNftBlogs/>} /> */}
            <Route exact path='/nft' element={<NftBlog />} />
            <Route exact path='/tech' element={<TechBlog />} />
            <Route exact path='/anime' element={<AnimeBlog />} />
            <Route exact path='/games' element={<GameBlog />} />
            <Route exact path='/add-blog' element={<AddBlog />} />
            <Route exact path='/singleBlog/:id' element={<SingleBlog/>}/>
            
            {/* pages */}
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />



          </Routes>
        </div>
      </BrowserRouter>
    </BlogSate>
  );
}

export default App;

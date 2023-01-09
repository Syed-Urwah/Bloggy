import BlogContext from "./blogContext";
import { useState} from "react";


const BlogSate = (props) => {

  const host = "http://localhost:5000";

  const BlogInitial = []



  //all blogs documents
  const [blogs, setBlogs] = useState(BlogInitial);

  const [limitBlog, setlimitBlog] = useState([]);
  const [countLimitBlog, setcountLimitBlog] = useState(0)
  let page = {
    next: ""
  }
  const [nftBlog, setnftBlog] = useState([])

  //current user blog
  const [userBlogs,setUserBlogs] = useState([]);

  //singleBlog
  const [singleBlog,setSingleBlog] = useState({});

  //isUser loggedIn
  const [isUser,setIsUser] = useState(false);

  const [searchValue, setsearchValue] = useState("")

  const [currentUser, setcurrentUser] = useState({})

  const [updatedUser, setupdatedUser] = useState([])


  //alert
  const [alert, setalert] = useState({
    msg:"",
    type: ""
  });

  //show alert function


  
  








// CRUD of notes

//fetching all Blogs
const getBlog = async () => {
  const url = `${host}/blog/fetch-blogs`;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json()
  console.log(data);
  setBlogs(data);
  console.log(blogs)
}


//Add a Blog
const addBlog = async (Blogdata)=>{
  const url = `${host}/blog/create-blog`;
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem("token")
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(Blogdata) // body data type must match "Content-Type" header
  });
  let data = await response.json();
  let error = data.errors;
  // console.log(error[0].msg);

  if(data.success){
    setUserBlogs(userBlogs.concat(data.saveBlog));
    setalert({
      msg: "Blog Added",
      type: "success"
    });
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }else{
    setalert({
      msg: error[0].msg,
      type: "danger"
    });
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }
  }

//fetch user blog
const UserBlog = async ()=>{
  const url = `${host}/blog/fetch-user-blog`;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let data = await response.json();
  console.log(data);
  setUserBlogs(data);
  console.log(userBlogs);
}


  


//Delete a Note
const deleteBlog = async (id) =>{
  const url = `${host}/blog/delete-blog/${id}`
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let data = await response.json();
  console.log(data);

  const newBlog = userBlogs.filter((blogs)=>{
    return blogs._id !== id
  })

  setUserBlogs(newBlog);

  return data // parses JSON response into native JavaScript objects
}

//Edit a Note
const updateBlog = async (title,description,tag,id) =>{
  const url = `${host}/blog/update-blog/${id}`
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({
      title: title,
      description: description,
      tag: tag
    }) // body data type must match "Content-Type" header
  });
  let data = await response.json();
  console.log(data);

  //converting JSON into javascript object
  let newNotes = JSON.parse(JSON.stringify(userBlogs));
  console.log(newNotes) 

  //Login to know which note is edit
  for(let i = 0; i<newNotes.length; i++){
    if(newNotes[i]._id === id){
      newNotes[i].title = title;
      newNotes[i].description = description;
      newNotes[i].tag = tag;

      console.log(newNotes[i]);
      break;
    }
  }
  setUserBlogs(newNotes);

  // return response.json(); // parses JSON response into native JavaScript objects

}
//get single blog
const getSingleBlog = async (id) =>{
  const url = `${host}/blog/single-blog/${id}`
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
  });
  let data = await response.json();
  console.log(data);
  setSingleBlog(data);
  console.log(singleBlog);
  // return data; // parses JSON response into native JavaScript objects
}

const limitBlogs = async (page,limit) =>{
  const url = `${host}/blog/blogs/?page=${page}&limit=${limit}`
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let data = await response.json()
  console.log(data)
  
  console.log(data.length);
  setlimitBlog(data.results);
  setcountLimitBlog(data.length);
  console.log(limitBlog)
  console.log(countLimitBlog)
  return data; // parses JSON response into native JavaScript objects
}










return (
  <BlogContext.Provider value={{ getBlog,UserBlog, addBlog ,updateBlog,deleteBlog,getSingleBlog,limitBlogs ,setBlogs,blogs,limitBlog,userBlogs,singleBlog, countLimitBlog,nftBlog,setnftBlog,page,isUser,setIsUser,alert, currentUser,setcurrentUser,updatedUser,setupdatedUser,searchValue,setsearchValue }}>
    {props.children}
  </BlogContext.Provider>
)
}

export default BlogSate;
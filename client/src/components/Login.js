import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import blogContext from '../context/blogContext';

export default function Login() {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const blogApi = useContext(blogContext);

  const [loginData, setloginData] = useState([{
    email: "",
    password: ""
  }])

  useEffect(() => {

    if(blogApi.isUser){
      navigate("/logout")
    }
    
    // eslint-disable-next-line
  }, [])
  

  //getting the value
  // const getValue = (e)=>{
  //   setloginData({...loginData,[e.target.name] : e.target.value})
  //   // console.log(loginData);
  // }

  const getValue = () =>{
    let email_value = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    setloginData({
      email: email_value,
      password: pass
    })
  }


  //Login the user

  const userLogin = async (e) => {
    //preventing from reloding the page
    e.preventDefault();
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData), // body data type must match "Content-Type" header
    });
    console.log(loginData)
    let data = await response.json(); // parses JSON response into native JavaScript objects
    console.log(data)
    blogApi.setcurrentUser(data);
    console.log(blogApi.currentUser);

    if(data.success){
      //storing the auth token and redirect the user
      localStorage.setItem('token', data.authtoken);

      blogApi.setIsUser(true);
      navigate("/");
    }
  }

  
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100 center-layout">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt='' />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={userLogin}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input onChange={getValue} name="email" type="email" id="email" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input onChange={getValue} name="password" type="password" id="password" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* <!-- Checkbox --> */}
                  {/* <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div> */}
                  <a href="#!">Forgot password?</a>
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">Log in</button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} href="#!"
                  role="button">
                  <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                </a>
                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }} href="#!"
                  role="button">
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

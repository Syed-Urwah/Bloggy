import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import blogContext from '../context/blogContext';

export default function Signup() {

  const host = "http://localhost:5000";

  //blogContext
  const blogApi = useContext(blogContext)

  //navigate hook
  const navigate = useNavigate();

  const [signupData,setSignupData] = useState({
    Username: "",
    email: "",
    password: ""
  })

//getting the value
  const getValue = (e)=>{
    setSignupData({...signupData,[e.target.name] : e.target.value})
    console.log(signupData);
  }

  const userSignup = async (e) => {
    //preventing from reloding the page
    e.preventDefault();
    const response = await fetch(`${host}/auth/create-user`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: signupData.Username,
        email: signupData.email,
        password: signupData.password
      }), // body data type must match "Content-Type" header
      // redirect: 'follow', // manual, *follow, error
    });
    console.log(signupData)
    let data = await response.json(); // parses JSON response into native JavaScript objects
    console.log(data)
    // return data;

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
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt='' />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={userSignup}>

                {/* <!-- Name input --> */}
                <div className="form-outline mb-4">
                  <input onChange={getValue} type="text" value={signupData.Username} name='Username' id="form1Example13" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example13">Name</label>
                </div>


                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input onChange={getValue} type="email" value={signupData.email} name='email' id="form1Example13" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input onChange={getValue}  type="password" value={signupData.password} name='password' id="form1Example23" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>

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

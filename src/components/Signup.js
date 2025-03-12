import React, { useState } from "react";
import "./CSS/Login.css";
import sideimg from "./Image/half.png";

import axios from "axios";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://whatsapp-bot-p5ey.onrender.com/signup",
        {
          "email": email,
          "password":password,
        },
        {
          headers: { "Content-Type": "application/json" }
        }
    
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Signup failed");
    }
  };
  




  return (
    <div className="d-flex flex-column flex-md-row vh-100">
       <div className="col-md-7 d-flex flex-column justify-content-center align-items-center  ">
        

    
        <img src={sideimg} alt="Side Visual" className="img-fluid"   />
      </div>

      {/* Right Side - Sign-up Form */}
      <div className="col-md-5 d-flex flex-column justify-content-center p-4 p-md-5">
        <h2 className="mb-4 text-center header">Create your Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@email.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="at least 8 characters"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
               
              placeholder="at least 8 characters"
            />
          </div>
          <a href="" className="text-primary d-flex justify-content-end">Forgot Password?</a>
          
         
          <div className="d-flex justify-content-center">
          <button type="submit" className="submit-btn">
          Sign up
          </button>
          </div>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
        <div className="text-center my-3">Or</div>
        {/* <button className="btn btn-outline-primary w-100">
          <i className="bi bi-google me-2"></i>Sign up with Google
        </button> */}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/" className="text-primary">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

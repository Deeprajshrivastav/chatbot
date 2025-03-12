import React, { useState } from "react";
import "./CSS/Login.css";
import sideimg from "./Image/half.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // Fixed undefined state
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://whatsapp-bot-p5ey.onrender.com/login",
        new URLSearchParams({
          "username":username,
          "password": password
        }).toString(), // Correct format for x-www-form-urlencoded
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      );

      setToken(response.data.access_token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed: " + (error.response?.data?.detail || "Unknown Error"));
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="col-md-7 d-flex flex-column justify-content-center align-items-center  ">
        

    
        <img src={sideimg} alt="Side Visual" className="img-fluid"   />
      </div>

      {/* Right Side - Login Form */}
      <div className="col-md-5 d-flex flex-column justify-content-center p-4 p-md-5">
        <h2 className="mb-5 text-center header">Login to your Account</h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Example@email.com"
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}  // Toggle visibility
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="at least 8 characters"
            />
            {/* Show Password Checkbox */}
            <div className="form-check mt-2 d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label" htmlFor="showPassword">
                  Show Password
                </label>
              </div>
              <a href="" className="text-primary">Forgot Password?</a>
            </div>
          </div>

          <div className="d-flex justify-content-center">
          <button type="submit" className="submit-btn">
            Login
          </button>
          </div>
          
        </form>

        <div className="text-center my-3">Or</div>

        {/* <button className="btn btn-outline-primary w-100">
          <i className="bi bi-google me-2"></i>Login with Google
        </button> */}

        <p className="mt-3 text-center">
          Don't have an account? {" "}
          <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

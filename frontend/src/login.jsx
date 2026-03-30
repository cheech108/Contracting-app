import React, { useState } from "react";
import Navbar from "./modules/navbar.jsx";
import "./login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5005/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setMessage("Login successful!");
        //window.location.href = "/dash";
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (  
    <div className="centered-div">
      <div className="top-section">
        <p className="top-words">Login</p>
      </div>
      {message && <p className="Error-text">{message}</p>}
      <input type="email" className="text-input" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" className="text-input" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="button" className="login-button" value="Login" onClick={handleLogin}/>
    </div>
  );
}

export default Login;
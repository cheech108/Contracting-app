import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./modules/navbar.jsx";
import "./login.css"

function Signup() {
  async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const hash = await sha256(password);
      const response = await fetch("http://localhost:5005/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "first_name":firstName, "last_name":lastName, email, "password":hash }),
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        // Store token for client-side use
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setMessage("Signup successful, please login now!");
      } else {
        setMessage(data.message || "Signup failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (  
    <div className="login-page">
      <div className="centered-div">
        <div className="top-section">
          <p className="top-words">Sign Up</p>
        </div>
        {message && <p className="Error-text">{message}</p>}
        <input className="text-input" name="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input className="text-input" name="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input type="email" className="text-input" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" className="text-input" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="button" className="login-button" value="Sign Up!" onClick={handleLogin}/>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;
import React from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
  <nav className="navbar">
    <div className="navbar-left">
      <a className="logo">
        OnTime
      </a>
    </div>
    <div className="navbar-center">
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/dash">Dashboard</a>
        </li>
      </ul>
    </div>
    <div className="navbar-right">
      <button className="login-Button" onClick={() => navigate("/login")}>
      Sign In
      </button>
    </div>
  </nav>
  );
};

export default Navbar;
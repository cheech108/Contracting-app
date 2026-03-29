import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a className="logo">
      ContractMe
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
    <button className="login-Button">Login</button>
  </div>
</nav>
);
};

export default Navbar;
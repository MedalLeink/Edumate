import { Link } from "react-router-dom";
import logo from "./logo2.png";
import "./navbar.css";
import React from "react";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to={'/'}>
        <div>
          <img src={logo} className="logo" />
        </div>
        </Link>
        <div>
          <p>
            Hello <span>Username</span>
          </p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

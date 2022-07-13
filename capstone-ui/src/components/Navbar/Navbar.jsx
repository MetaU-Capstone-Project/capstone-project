// import * as React from "react";

import "./Navbar.css";

import { logout } from "../../spotify";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  return (
    <div className="navbar-component">
      <Link to={"/home"} className="navbar-link">
        Home
      </Link>
      <Link to={"/search"} className="navbar-link">
        Search
      </Link>
      <Link to={"/groups"} className="navbar-link">
        Groups
      </Link>
      {/* TODO - profile */}
      {/* TODO profile icon */}
      <Link to={"/profile"} className="navbar-link">
        Profile
      </Link>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

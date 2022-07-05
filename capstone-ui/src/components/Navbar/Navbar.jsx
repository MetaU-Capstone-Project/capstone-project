// import * as React from "react";

import "./Navbar.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// TODO
export default function Navbar() {
  return (
    <div className="navbar-component">
      <div className="navbar-link">
        <span>Home</span>
      </div>
      <div className="navbar-link">
        <span>Search</span>
      </div>
      <div className="navbar-link">
        <span>Groups</span>
      </div>
      <div className="navbar-link">
        <img></img>
      </div>
    </div>
  );
}

// import * as React from "react";

import "./Navbar.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  return (
    <div className="navbar-component">
      <Link to={"/feed"} className="navbar-link">
        Feed
      </Link>
      <Link to={"/search"} className="navbar-link">
        Search
      </Link>
      <Link to={"/groups"} className="navbar-link">
        Groups
      </Link>
      {/* TODO - profile */}
      <Link to={"/home"} className="navbar-link">
        <img></img>
      </Link>
    </div>
  );
}

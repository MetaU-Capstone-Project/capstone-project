// import * as React from "react";
import "./SearchBar.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchBar() {
  return (
    <div className="searchbar-component">
      <input className="search-input"></input>
      <button className="search-button">Search</button>
    </div>
  );
}

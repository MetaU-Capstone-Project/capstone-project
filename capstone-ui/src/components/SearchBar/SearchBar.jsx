// import * as React from "react";
import "./SearchBar.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchBar({ searchSongs, setSearchInput }) {
  return (
    <div className="searchbar-component">
      <input
        className="search-input"
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button className="search-button" onClick={searchSongs}>
        Search
      </button>
    </div>
  );
}

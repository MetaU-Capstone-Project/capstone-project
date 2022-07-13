// import * as React from "react";
import "./SearchBar.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchBar({
  searchSongs,
  setSearchInput,
  searchProfiles,
  searchInput,
}) {
  return (
    <div className="searchbar-component">
      <input
        className="search-input"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      ></input>
      <button className="search-button" onClick={searchSongs}>
        Search Songs
      </button>
      <button className="search-button" onClick={searchProfiles}>
        Search Profiles
      </button>
    </div>
  );
}

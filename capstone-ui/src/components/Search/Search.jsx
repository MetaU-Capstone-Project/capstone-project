// import * as React from "react";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

import axios from "axios";

import "./Search.css";

export default function Search({ token }) {
  const [searchInput, setSearchInput] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);

  const searchSongs = async (e) => {
    e.preventDefault();

    console.log("token from search: " + token);

    const { data } = await axios
      .get(
        "https://api.spotify.com/v1/search",
        {
          params: {
            q: searchInput,
            type: "track",
            include_external: "audio",
            limit: 50,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log(data.tracks.items);
    setSongResults(data.tracks.items);
  };

  return (
    <div className="search-page">
      <SearchBar
        searchSongs={searchSongs}
        setSearchInput={setSearchInput}
      ></SearchBar>
      <SearchResults results={songResults} token={token}></SearchResults>
      {/* TODO - search results */}
    </div>
  );
}

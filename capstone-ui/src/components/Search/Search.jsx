// import * as React from "react";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

import axios from "axios";

import "./Search.css";

export default function Search({ username, token }) {
  const [searchInput, setSearchInput] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);
  const [isSongResults, setIsSongResults] = useState(true);

  const searchSongs = async (e) => {
    e.preventDefault();

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

    setSongResults(data.tracks.items);
    setIsSongResults(true);
  };

  const searchProfiles = async (e) => {
    e.preventDefault();

    const results = await axios
      .get("http://localhost:3001/user/users")
      .catch((error) => {
        console.log(error);
      });

    let newArray = results.data.filter(
      (element) => element.username !== username
    );

    setProfileResults(newArray);
    setIsSongResults(false);
  };

  return (
    <div className="search-page">
      <SearchBar
        searchSongs={searchSongs}
        setSearchInput={setSearchInput}
        searchProfiles={searchProfiles}
      ></SearchBar>
      <SearchResults
        // added
        username={username}
        // added
        songResults={songResults}
        profileResults={profileResults}
        token={token}
        isSongResults={isSongResults}
      ></SearchResults>
      {/* TODO - search results */}
    </div>
  );
}

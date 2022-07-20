import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

import axios from "axios";

import "./Search.css";

export default function Search({ username, token }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);
  const [isSongResults, setIsSongResults] = useState(true);
  const [offset, setOffset] = useState(0);

  const searchSongs = async (e) => {
    if (searchInput != "") {
      let temp = searchInput;
      if (searchInput === "") {
        temp = searchInputValue;
      }
      setSearchInputValue(temp);

      setProfileResults([]);

      e.preventDefault();
      if (!isSongResults) {
        setOffset(0);
      }

      let oldResults = songResults;
      const { data } = await axios
        .get(
          "https://api.spotify.com/v1/search",
          {
            params: {
              q: temp,
              type: "track",
              include_external: "audio",
              limit: 5,
              offset: offset,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {});

      let newResults = data.tracks.items;
      let addedResults = oldResults.concat(newResults);
      setSongResults(addedResults);
      setIsSongResults(true);
      setOffset((previousValue) => previousValue + 5);
      setSearchInput("");
    }
  };

  const searchProfiles = async (e) => {
    setSongResults([]);
    e.preventDefault();
    if (!isSongResults) {
      setOffset(0);
    }

    const results = await axios
      .get("http://localhost:3001/user/users")
      .catch((error) => {});

    let tempArray = results.data.filter(
      (element) => element.username !== username
    );

    setProfileResults(tempArray);
    setIsSongResults(false);
  };

  const loadMore = (e) => {
    setOffset((previousValue) => previousValue + 5);
    if (isSongResults) {
      searchSongs(e);
    } else {
      searchProfiles(e);
    }
  };

  return (
    <div className="search-page">
      <SearchBar
        searchSongs={searchSongs}
        setSearchInput={setSearchInput}
        searchProfiles={searchProfiles}
        searchInput={searchInput}
      ></SearchBar>
      <SearchResults
        username={username}
        songResults={songResults}
        profileResults={profileResults}
        token={token}
        isSongResults={isSongResults}
      ></SearchResults>
      {(songResults.length != 0 || profileResults.length != 0) && (
        <div className="load-more-button-wrapper">
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

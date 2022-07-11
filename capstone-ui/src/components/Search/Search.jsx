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
  const [offset, setOffset] = useState(0);

  const searchSongs = async (e) => {
    setProfileResults([]);
    e.preventDefault();
    // first time loading song results
    if (!isSongResults) {
      setOffset(0);
      // TODO need to clear grid
      // setSongResults([]);
    }

    let oldResults = songResults;
    const { data } = await axios
      .get(
        "https://api.spotify.com/v1/search",
        {
          params: {
            q: searchInput,
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
      .catch((error) => {
        console.log(error);
      });

    let newResults = data.tracks.items;
    let addedResults = oldResults.concat(newResults);
    setSongResults(addedResults);
    setIsSongResults(true);
    setOffset((previousValue) => previousValue + 5);
    // added
    // setSearchInput("");
  };

  const searchProfiles = async (e) => {
    setSongResults([]);
    e.preventDefault();
    // first time loading song results
    if (!isSongResults) {
      setOffset(0);
      // added
      // setProfileResults([]);
    }

    const results = await axios
      .get("http://localhost:3001/user/users")
      .catch((error) => {
        console.log(error);
      });

    let tempArray = results.data.filter(
      (element) => element.username !== username
    );

    // TODO offset
    // 5 for each new set of profiles returned
    let min = Math.min(offset + 5, tempArray.length);
    let newArray = tempArray.slice(offset, min);

    console.log("new array");
    console.log(newArray);

    setProfileResults(newArray);
    setIsSongResults(false);
  };

  // TODO modify

  const loadMore = (e) => {
    // TODO remove
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

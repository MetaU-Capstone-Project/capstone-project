import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

import axios from "axios";
import TrieSearch from "trie-search";

import "./Search.css";

export default function Search({ username, token }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);
  const [isSongResults, setIsSongResults] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    useState(false);
  const [tab, setTab] = useState("search-songs");

  React.useEffect(() => {
    if (tab === "search-profiles") {
      searchProfiles();
    }
  }, [searchInput]);

  function handleTabChange(e) {
    setSearchInput("");
    setSongResults([]);
    setTab(e.target.id);
    e.target.className = "is-active-search";
  }

  const handleMouseOver = (username) => {
    setIsHovering(true);
    on();
    setHoverUsername(username);
    setShouldUpdateProfileDetails(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    off();
    setShouldUpdateProfileDetails(false);
  };

  const searchSongs = async () => {
    let trueSearchValue = searchInput;
    let oldResults = songResults;
    if (searchInput === "") {
      trueSearchValue = searchInputValue;
    } else {
      oldResults = [];
    }

    const { data } = await axios
      .get(
        "https://api.spotify.com/v1/search",
        {
          params: {
            q: trueSearchValue,
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
    setSearchInputValue(trueSearchValue);
    setSearchInput("");
  };

  const searchProfiles = async (e) => {
    let trueSearchValue = searchInput;
    if (searchInput == "") {
      trueSearchValue = searchInputValue;
    } else {
    }

    setSongResults([]);
    if (!isSongResults) {
      setOffset(0);
    }

    const trie = new TrieSearch();
    const profiles = (
      await axios
        .get("http://localhost:3001/user/users")
        .catch((error) => alert("Error searching for profiles."))
    ).data.filter((profile) => profile.username !== username);
    for (let i = 0; i < profiles.length; i++) {
      trie.map(profiles[i].username, profiles[i].username);
    }

    setProfileResults(trie.search(trueSearchValue));
    setIsSongResults(false);
  };

  const loadMore = (e) => {
    if (isSongResults) {
      searchSongs(e);
    } else {
      searchProfiles(e);
    }
  };

  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  return (
    <div className="search-page">
      <div id="overlay">
        <div className="profile-details-wrapper">
          {hoverUsername && (
            <ProfileDetails
              username={hoverUsername}
              setShouldUpdateProfileDetails={shouldUpdateProfileDetails}
            ></ProfileDetails>
          )}
        </div>
      </div>
      <SearchBar
        searchSongs={searchSongs}
        setSearchInput={setSearchInput}
        searchProfiles={searchProfiles}
        searchInput={searchInput}
        tab={tab}
        handleTabChange={handleTabChange}
      ></SearchBar>
      <SearchResults
        username={username}
        songResults={songResults}
        profileResults={profileResults}
        token={token}
        isSongResults={isSongResults}
        isHovering={isHovering}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
      ></SearchResults>
      {(songResults.length != 0 || profileResults.length != 0) &&
        tab === "search-songs" && (
          <div className="load-more-button-wrapper">
            <button className="load-more-button" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
    </div>
  );
}

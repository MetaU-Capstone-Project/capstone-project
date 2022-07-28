import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import axios from "axios";

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

  const searchSongs = async (e) => {
    let oldSearchResults;
    let trueSearchValue = searchInput;
    if (searchInput == "") {
      trueSearchValue = searchInputValue;
      oldSearchResults = songResults;
    } else {
      oldSearchResults = [];
    }

    let postRequest = {
      username: username,
      searchValue: trueSearchValue,
    };
    const searchResponse = await axios
      .post(`http://localhost:3001/user/addrecentsearch`, postRequest)
      .catch((error) => alert(`Error! ${error.message}`));

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
      .catch((error) => {
        alert(`Error searching for ${trueSearchValue}.`);
      });

    let newResults = data.tracks.items;
    let addedResults = oldSearchResults.concat(newResults);
    setSongResults(addedResults);
    setIsSongResults(true);
    setOffset((previousValue) => previousValue + 5);
    setSearchInputValue(trueSearchValue);
    setSearchInput("");
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

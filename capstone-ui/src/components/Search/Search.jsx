import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { accessToken } from "../../spotify";
import { showPopup, hidePopup } from "../../utils";
import axios from "axios";
import TrieSearch from "trie-search";
import "./Search.css";

/**
 * Page to display search bar and results
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 */
export default function Search({ username }) {
  // searchInput is the variable in the search bar input field that is cleared after each search
  const [searchInput, setSearchInput] = useState("");

  // searchInputValue is the variable storing the last search used for loading more song results, since the search bar is cleared after each search
  const [searchInputValue, setSearchInputValue] = useState("");

  // isSongResults is true if user is searching for songs, and false if searching for profiles
  const [isSongResults, setIsSongResults] = useState(true);

  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);

  const [offset, setOffset] = useState(0);

  // If user is hovering over component, display the popup
  const [isHovering, setIsHovering] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    useState(false);

  // Tabs have two options: search-songs and search-profiles
  const [tab, setTab] = useState("search-songs");

  // Searches for profiles whenever tab is on "search-profiles" to have live results as user types
  React.useEffect(() => {
    if (tab === "search-profiles") {
      searchProfiles();
    }
  }, [searchInput]);

  // Changes tab and emphasizes which tab the user is on
  function handleTabChange(e) {
    setSearchInput("");
    setSongResults([]);
    setProfileResults([]);
    setTab(e.target.id);
    e.target.className = "is-active-search";
  }

  // Displays the popup if user is hovering over a profile result
  const handleMouseOver = (username) => {
    setIsHovering(true);
    showPopup();
    setHoverUsername(username);
    setShouldUpdateProfileDetails(true);
  };

  // Hides the popup if user is hovering over a profile result
  const handleMouseOut = () => {
    setIsHovering(false);
    hidePopup();
    setShouldUpdateProfileDetails(false);
  };

  // Retrieves 5 songs from the Spotify API at a specified offset to ensure new unique results are rendered
  const searchSongs = async () => {
    // Seaarches for songs that match what was previously input into the search bar, as user has pressed load more button if the search input is clear
    // Otherwise, user is searching for the first time
    let trueSearchValue = searchInput == "" ? searchInputValue : searchInput;

    // Save previous search results as user has pressed load more button since search input is cleared
    // Otherwise, uer is searching for the first time, so clear search results grid
    let oldResults = searchInput == "" ? songResults : [];

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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        alert(`Error searching for songs to do with ${trueSearchValue}.`);
      });

    // Display the previous results along with the 5 new songs if user has pressed the load more button
    setSongResults(oldResults.concat(data.tracks.items));
    setIsSongResults(true);
    setOffset((previousValue) => previousValue + 5);
    setSearchInputValue(trueSearchValue);
    setSearchInput("");
  };

  // Retrieves profiles that have usernames with the search input as prefix
  const searchProfiles = async (e) => {
    const trie = new TrieSearch();
    const profiles = (
      await axios
        .get("http://localhost:3001/user/users")
        .catch((error) => alert("Error searching for profiles."))
    ).data.filter((profile) => profile.username !== username);
    for (let i = 0; i < profiles.length; i++) {
      trie.map(profiles[i].username, profiles[i].username);
    }
    setProfileResults(trie.search(searchInput));
    setIsSongResults(false);
  };

  // Loads more song results when user clicks load more button
  const loadMore = (e) => {
    if (isSongResults) {
      searchSongs(e);
    }
  };

  return (
    <div className="search-page">
      <div id="overlay">
        <div className="profile-details-wrapper">
          {hoverUsername != null && (
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
        searchInput={searchInput}
        tab={tab}
        handleTabChange={handleTabChange}
      ></SearchBar>
      <SearchResults
        username={username}
        songResults={songResults}
        profileResults={profileResults}
        isSongResults={isSongResults}
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

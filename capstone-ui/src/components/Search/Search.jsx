import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { accessToken } from "../../spotify";
import { showPopup, hidePopup } from "../../utils";
import axios from "axios";
import TrieSearch from "trie-search";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./Search.css";

export default function Search({ username }) {
  // Indicates whether results are being retrieved from backend
  const [loading, setLoading] = useState(false);

  const [songResults, setSongResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);

  // Value of previous search, used when user continues scrolling for song results but search bar is cleared
  const [previousSearch, setPreviousSearch] = useState("");

  // searchInput is the variable in the search bar input field as the user types
  const [searchInput, setSearchInput] = useState("");

  // searchInputValue is the variable of the search used for loading results, since the search bar is cleared after each search
  const [searchInputValue, setSearchInputValue] = useState("");

  // If user is hovering over component, display the popup with the user's username and details
  const [isHovering, setIsHovering] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    useState(false);

  // Tabs have two options: search-songs and search-profiles
  const [tab, setTab] = useState("search-songs");

  function useFetch(page, searchInput) {
    const getSongResults = useCallback(async () => {
      if (searchInput != "") {
        try {
          setLoading(true);
          // If user scrolls down for more search results, present previously scrolled past results
          let oldSongResults =
            previousSearch !== searchInput ? [] : songResults;

          setSongResults(
            oldSongResults.concat(
              (
                await axios.get(
                  "https://api.spotify.com/v1/search",
                  {
                    params: {
                      q: searchInput,
                      type: "track",
                      include_external: "audio",
                      limit: 30,
                      offset: page * 30,
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                )
              ).data.tracks.items
            )
          );
          setLoading(false);
          setPreviousSearch(searchInput);
        } catch (err) {
          alert(`Error loading more song results for ${searchInput}`);
        }
      }
    }, [page, searchInput]);

    useEffect(() => {
      getSongResults();
    }, [getSongResults]);

    return { loading, songResults };
  }

  function useInfiniteScroll() {
    const [page, setPage] = useState(1);
    const loadMoreRef = useRef(null);

    const handleInfiniteScrollingObserver = useCallback((viewingTarget) => {
      // If the search results has reached the loading spinner, increase the page to offset the next search results
      if (viewingTarget[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, []);

    useEffect(() => {
      const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };

      const infiniteScrollingObserver = new IntersectionObserver(
        handleInfiniteScrollingObserver,
        option
      );

      if (loadMoreRef.current)
        infiniteScrollingObserver.observe(loadMoreRef.current);
    }, [handleInfiniteScrollingObserver]);

    return { loadMoreRef, page };
  }

  const { loadMoreRef, page } = useInfiniteScroll();
  useFetch(page, searchInputValue);

  // Searches for profiles whenever tab is on "search-profiles" to have live results as user types
  React.useEffect(() => {
    if (tab === "search-profiles") {
      searchProfiles();
    }
  }, [searchInput]);

  // Changes tab and emphasizes which tab the user is on
  function handleTabChange(tab) {
    setSearchInput("");
    setSongResults([]);
    setProfileResults([]);
    setTab(tab.target.id);
    tab.target.className = "is-active-search";
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

  // Retrieves profiles that have usernames with the search input as prefix
  const searchProfiles = async (e) => {
    setSongResults([]);
    setProfileResults([]);

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
  };

  return (
    <div id="search-page">
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
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        tab={tab}
        handleTabChange={handleTabChange}
        setSearchInputValue={setSearchInputValue}
      ></SearchBar>
      <SearchResults
        username={username}
        songResults={songResults}
        profileResults={profileResults}
        isHovering={isHovering}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        tab={tab}
      ></SearchResults>
      <div ref={loadMoreRef} className="search-loading-spinner">
        {loading && <LoadingSpinner></LoadingSpinner>}
      </div>
    </div>
  );
}

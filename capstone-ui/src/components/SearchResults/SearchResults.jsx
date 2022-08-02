import React from "react";
import "./SearchResults.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeader from "../SongHeader/SongHeader";

/**
 * Component to display search results
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {Array<object>} props.songResults Array of songs that match the search input
 * @param {Array<object>} props.profileResults Array of profiles that match the search input
 * @param {Function} props.handleMouseOut Handler to display popup if user is hovering over a profile
 * @param {Function} props.handleMouseOver Handler to hide popup if user is no longer hovering over a profile
 * @param {string} props.tab Indicates which tab (songs or profiles) the user is currently on
 */
export default function SearchResults({
  username,
  songResults,
  profileResults,
  handleMouseOut,
  handleMouseOver,
  tab,
}) {
  return (
    <div className="searchresults-component">
      <div className="searchresults-grid">
        {/* Display song results if user is searching for songs */}
        {tab === "search-songs" &&
          songResults != null &&
          songResults.length > 0 &&
          songResults.map((song) => (
            <SongHeader key={song.id} song={song}></SongHeader>
          ))}
        {/* Display profile results if user is searching for profiles */}
        {tab === "search-profiles" &&
          profileResults != null &&
          profileResults.length > 0 &&
          profileResults.map((profile) => (
            <ProfileHeader
              username={username}
              key={profile.username}
              profile={profile}
              isSearchView={true}
              handleMouseOut={handleMouseOut}
              handleMouseOver={handleMouseOver}
            ></ProfileHeader>
          ))}
      </div>
    </div>
  );
}

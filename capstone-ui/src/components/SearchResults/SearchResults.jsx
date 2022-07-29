import React, { useState } from "react";
import "./SearchResults.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeader from "../SongHeader/SongHeader";

export default function SearchResults({
  username,
  songResults,
  profileResults,
  token,
  isSongResults,
  handleMouseOut,
  handleMouseOver,
}) {
  return (
    <div className="searchresults-component">
      <div className="searchresults-grid">
        {isSongResults != null &&
          songResults &&
          songResults.length > 0 &&
          songResults.map((song) => (
            <SongHeader key={song.id} song={song}></SongHeader>
          ))}
        {!isSongResults &&
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

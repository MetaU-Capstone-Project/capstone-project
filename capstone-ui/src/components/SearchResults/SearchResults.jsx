// import * as React from "react";
import React from "react";
import "./SearchResults.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeader from "../SongHeader/SongHeader";

export default function SearchResults({
  username,
  songResults,
  profileResults,
  token,
  isSongResults,
}) {
  let results;
  if (isSongResults) {
    results = songResults;
  } else {
    results = profileResults;
  }

  return (
    <div className="searchresults-component">
      <div className="searchresults-grid">
        {isSongResults &&
          results &&
          results.length > 0 &&
          results.map((element) => (
            <SongHeader key={element.id} song={element}></SongHeader>
          ))}
        {!isSongResults &&
          results &&
          results.length > 0 &&
          results.map((element) => (
            <ProfileHeader
              username={username}
              key={element.id}
              profile={element}
              isSearchView={true}
            ></ProfileHeader>
          ))}
      </div>
    </div>
  );
}

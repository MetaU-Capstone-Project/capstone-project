import React, { useState } from "react";
import "./SearchResults.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeader from "../SongHeader/SongHeader";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

export default function SearchResults({
  username,
  songResults,
  profileResults,
  token,
  isSongResults,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
              key={element.username}
              profile={element}
              isSearchView={true}
              handleMouseOut={handleMouseOut}
              handleMouseOver={handleMouseOver}
            ></ProfileHeader>
          ))}
      </div>
      {isHovering && <ProfileDetails></ProfileDetails>}
    </div>
  );
}

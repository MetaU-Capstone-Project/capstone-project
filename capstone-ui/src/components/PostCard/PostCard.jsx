// import * as React from "react";
import "./PostCard.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function PostCard({ username, profile, token, song }) {
  if (song == {}) {
    return <div>No song</div>;
  }

  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader
          username={username}
          profile={profile}
          token={token}
          // added 6/11
          isSearchView={false}
        ></ProfileHeader>
      </div>
      <div className="songcard-wrapper">
        <SongCard
          username={username}
          profile={profile}
          token={token}
          song={song}
        ></SongCard>
      </div>
    </div>
  );
}

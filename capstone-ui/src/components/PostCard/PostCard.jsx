// import * as React from "react";
import "./PostCard.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function PostCard({ profile, token, song }) {
  if (song == {}) {
    return <div>No song</div>;
  }

  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader profile={profile} token={token}></ProfileHeader>
      </div>
      <div className="songcard-wrapper">
        <SongCard profile={profile} token={token} song={song}></SongCard>
      </div>
    </div>
  );
}

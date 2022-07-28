import React from "react";
import "./PostCard.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";

export default function PostCard({ username, profile, token, song }) {
  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader
          username={username}
          profile={profile}
          token={token}
          isSearchView={false}
          handleMouseOut={() => {}}
          handleMouseOver={() => {}}
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

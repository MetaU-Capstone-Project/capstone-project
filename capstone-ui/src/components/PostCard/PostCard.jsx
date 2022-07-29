import React from "react";
import "./PostCard.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";

export default function PostCard({ username, profile, song }) {
  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader
          username={username}
          profile={profile}
          isSearchView={false}
        ></ProfileHeader>
      </div>
      <div className="songcard-wrapper">
        <SongCard username={username} profile={profile} song={song}></SongCard>
      </div>
    </div>
  );
}

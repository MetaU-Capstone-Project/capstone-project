// import * as React from "react";
import "./PostCard.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function PostCard() {
  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader></ProfileHeader>
      </div>
      <div className="songcard-wrapper">
        <SongCard></SongCard>
      </div>
    </div>
  );
}

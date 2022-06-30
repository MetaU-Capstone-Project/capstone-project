// import * as React from "react";
import "./PostHeader.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeader from "../SongHeader/SongHeader";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function PostHeader() {
  return (
    <div className="postheader-component">
      <div className="post-info-wrapper">
        <ProfileHeader></ProfileHeader>
        <div className="post-datetime-wrapper"></div>
      </div>
      <SongHeader id="songcard-component"></SongHeader>
    </div>
  );
}

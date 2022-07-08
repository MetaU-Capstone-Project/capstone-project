// import * as React from "react";
import "./PostHeader.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeadeView from "../SongHeaderView/SongHeaderView";
// import SongHeaderVi from "../SongHeader/SongHeader";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function PostHeader({ post, token, profile }) {
  console.log("post: " + post);

  return (
    <div className="postheader-component">
      <div className="post-info-wrapper">
        <ProfileHeader token={token} profile={profile}></ProfileHeader>
        <div className="post-datetime-wrapper"></div>
      </div>

      {/* TODO commented out for now */}
      {/* <SongHeaderView id="songcard-component"></SongHeaderView> */}

      {/* before */}
      {/* <SongHeader id="songcard-component"></SongHeader> */}
    </div>
  );
}

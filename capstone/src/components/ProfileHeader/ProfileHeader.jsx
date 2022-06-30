// import * as React from "react";
import "./ProfileHeader.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileHeader() {
  return (
    <div className="profileheader-component">
      <div className="profile-picture-wrapper">
        <img className="profile-picture" src={logo} alt="profile-picture"></img>
      </div>
      <div className="profile-username-wrapper">
        <span className="profile-username">Username</span>
      </div>
    </div>
  );
}

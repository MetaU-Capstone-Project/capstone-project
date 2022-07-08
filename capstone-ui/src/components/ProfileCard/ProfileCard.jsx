// import * as React from "react";
import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./ProfileCard.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

// TODO props = {page}
export default function ProfileCard({ token, profile }) {
  console.log("profilecard");
  console.log(profile);

  return (
    <div className="profilecard-component">
      <div className="profile-picture-wrapper">
        <img className="profile-picture" src={logo} alt="profile-picture"></img>
      </div>
      <div className="profile-info-wrapper">
        <span className="profile-username">
          Spotify Username: {profile.display_name}
        </span>
        {/* TODO date */}
        <span className="profile-join-date">Joined app July 6, 2022</span>
      </div>
      <div className="profile-buttons">
        {/* TODO username */}
        <button className="profile-friends-button">Your Friends</button>
        {/* TODO Recommended songs? */}
        {/* <button className="profile-friends"></button> */}
      </div>
    </div>
  );
}

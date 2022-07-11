// import * as React from "react";
import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./ProfileCard.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileCard({ username, token, profile, appProfile }) {
  return (
    <div className="profilecard-component">
      <div className="profile-picture-wrapper">
        {/* before */}
        {/* <img className="profile-picture" src={logo} alt="profile-picture"></img> */}
        {profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
          ></img>
        )}
        {/* <img
          className="profile-picture"
          src={profile.images[0].url}
          alt="profile-picture"
        ></img> */}
      </div>
      <div className="profile-info-wrapper">
        {/* added */}
        <span className="profile-username">Username: {username}</span>
        {/* added */}
        <span className="profile-username">
          Spotify Username: {profile.display_name}
        </span>
        {/* TODO date */}
        {appProfile && (
          <span className="profile-join-date">
            Joined app {appProfile.createdAt}
          </span>
        )}
        {/* <span className="profile-join-date">
          Joined app {appProfile.createdAt}
        </span> */}
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

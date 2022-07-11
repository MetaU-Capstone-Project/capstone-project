// import * as React from "react";
import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./ProfileCard.css";
import { Link } from "react-router-dom";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileCard({
  username,
  token,
  profile,
  appProfile,
  isPreferencesView,
}) {
  return (
    <div className="profilecard-component">
      <div className="profile-picture-wrapper">
        {/* {profile && profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
          ></img>
        )} */}
        <img src={logo}></img>
      </div>
      <div className="profile-info-wrapper">
        <span className="profile-username">Username: {username}</span>
        {profile && (
          <span className="profile-username">
            Spotify Username: {profile.display_name}
          </span>
        )}
        {appProfile && (
          <span className="profile-join-date">
            Joined app {appProfile.createdAt}
          </span>
        )}
      </div>
      <div className="profile-buttons">
        {/* TODO username */}
        <button className="profile-friends-button">Your Friends</button>
        {/* TODO added 6/11 */}
        {/* {!isPreferencesView && (
          <button className="profile-friends-button">Your Settings</button>
        )} */}
        {!isPreferencesView && (
          <Link to={"/preferences"} className="profile-friends">
            <button>Your Settings</button>
          </Link>
        )}
        {/* TODO Recommended songs? */}
        {/* <button className="profile-friends"></button> */}
      </div>
    </div>
  );
}

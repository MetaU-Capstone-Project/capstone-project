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
  tab,
  setTab,
}) {
  function handleTabChange(e) {
    setTab(e.target.id);
    e.target.className = "is-active";
  }

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
        <button
          id="timeline"
          className={
            tab === "timeline" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Timeline
        </button>
        <button
          id="followers"
          className={
            tab === "followers" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Friends
        </button>
        <button
          id="settings"
          className={
            tab === "settings" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Settings
        </button>
      </div>
    </div>
  );
}

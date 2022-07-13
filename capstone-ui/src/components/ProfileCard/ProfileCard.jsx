import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../../spotify";

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

  const deleteAccount = async (e) => {
    console.log("deleting account");
    console.log(username);
    axios
      .get(`http://localhost:3001/user/delete/${username}`)
      .then(function (response) {
        logout();
        window.location.href = "http://localhost:3000";
      });
  };

  const confirmDelete = async (e) => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount();
    }
  };

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
      <div className="delete-account-wrapper">
        <button className="delete-account-button" onClick={confirmDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

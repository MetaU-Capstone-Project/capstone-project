import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout, logoutWithUsername } from "../../spotify";
import { formatDate } from "../../utils";

import logo from "../../logo.png";

export default function ProfileCard({
  username,
  token,
  profile,
  appProfile,
  isPreferencesView,
  tab,
  setTab,
  isFriendProfileView,
}) {
  function handleTabChange(e) {
    setTab(e.target.id);
    e.target.className = "is-active";
  }

  const deleteAccount = async (e) => {
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

  const isProfileImageDefined =
    appProfile != null && appProfile.imageURL != undefined;

  return (
    <div className="profilecard-component">
      <div className="profile-picture-wrapper">
        {isProfileImageDefined && appProfile.imageURL === "logo" && (
          <img className="spotify-profile-picture" src={logo}></img>
        )}
        {isProfileImageDefined && appProfile.imageURL !== "logo" && (
          <img
            className="spotify-profile-picture"
            src={appProfile.imageURL}
          ></img>
        )}
      </div>
      <div className="profile-info-wrapper">
        <span className="profile-username">Username: {username}</span>
        {appProfile != null && (
          <span className="profile-join-date">
            Joined app {formatDate(appProfile.createdAt)}
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
          Timeline
        </button>
        <button
          id="followers"
          className={
            tab === "followers" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Friends
        </button>
        {!isFriendProfileView && (
          <>
            <button
              id="settings"
              className={
                tab === "settings" ? "is-active" : "profile-friends-button"
              }
              onClick={handleTabChange}
            >
              Settings
            </button>
            <div className="delete-account-wrapper">
              <button className="delete-account-button" onClick={confirmDelete}>
                Delete Account
              </button>
              <button
                className="logout-account-button"
                onClick={() => logoutWithUsername(username)}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

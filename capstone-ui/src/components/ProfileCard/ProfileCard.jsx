import React from "react";
import "./ProfileCard.css";
import axios from "axios";
import { logout, logoutWithUsername } from "../../spotify";
import { formatDate } from "../../utils";
import logo from "../../logo.svg";

/**
 * Component to display individual profile information and tabs to learn more
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {object} props.appProfile App profile information associated with current user
 * @param {string} props.tab Identifier indicates which tab user is viewing
 * @param {Function} props.setTab Handler to change which tab user is viewing
 * @param {boolean} props.isFriendProfileView Indicates whether component is rendering a profile that isn't the current user's
 */
export default function ProfileCard({
  username,
  appProfile,
  tab,
  setTab,
  isFriendProfileView,
}) {
  // Set which tab is active and change color of tab that is active
  function handleTabChange(e) {
    setTab(e.target.id);
    e.target.className = "is-active";
  }

  // Deletes the current user's account, only displayed if the profile is that of the current user
  const deleteAccount = async (e) => {
    axios
      .get(`http://localhost:3001/user/delete/${username}`)
      .then(function (response) {
        logout();

        window.location.href = "http://localhost:3000";
      });
  };

  // Displays confirmation message to delete account
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
        {/* Renders settings tab only if profile being viewed belongs to current user */}
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

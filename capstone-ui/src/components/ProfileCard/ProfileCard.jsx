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
  // added
  tab,
  setTab,
}) {
  // const [tab, setTab] = React.useState("");

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
      {/* was working */}
      <div className="profile-buttons">
        {/* <Link to={"/timeline"}> */}
        <button
          id="timeline"
          className={
            tab === "timeline" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Timeline
        </button>
        {/* </Link> */}
        {/* <Link to={"/followers"} className="profile-friends"> */}
        <button
          id="followers"
          className={
            tab === "followers" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Friends
        </button>
        {/* </Link> */}
        {/* <Link to={"/preferences"} className="profile-friends"> */}
        <button
          id="settings"
          className={
            tab === "settings" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Settings
        </button>
        {/* </Link> */}
      </div>
      {/* <div className="profile-buttons">
        <Link
          to={"/timeline"}
          id="timeline"
          className={
            tab === "timeline" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Timeline
        </Link>
        <Link
          to={"/followers"}
          id="friends"
          className={tab === "friends" ? "is-active" : "profile-friends-button"}
          onClick={handleTabChange}
        >
          Your Friends
        </Link>
        <Link
          to={"/preferences"}
          id="preferences"
          className={
            tab === "preferences" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Your Settings
        </Link>
      </div> */}

      {/* not working */}
      {/* <div className="profile-buttons">
        <div className="tab">
          <Link
            to={"/timeline"}
            id="timeline"
            className={
              tab === "timeline" ? "is-active" : "profile-friends-button"
            }
            onClick={handleTabChange}
          >
            Your Timeline
          </Link>
        </div>
        <Link to={"/followers"} className="profile-friends">
          <button
            id="friends"
            className={
              tab === "friends" ? "is-active" : "profile-friends-button"
            }
            onClick={handleTabChange}
          >
            Your Friends
          </button>
        </Link>
        <Link to={"/preferences"} className="profile-friends">
          <button
            id="preferences"
            className={
              tab === "preferences" ? "is-active" : "profile-friends-button"
            }
            onClick={handleTabChange}
          >
            Your Settings
          </button>
        </Link>
      </div> */}
    </div>
  );
}

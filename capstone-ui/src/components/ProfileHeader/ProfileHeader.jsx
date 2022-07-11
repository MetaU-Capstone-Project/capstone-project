// import * as React from "react";
import React, { useState, useEffect } from "react";
import "./ProfileHeader.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileHeader({
  username,
  profile,
  token,
  isSearchView,
}) {
  // added
  React.useEffect(() => {
    async function getAppProfile() {
      // const response = await axios.get(
      //   `http://localhost:3001/user/timeline/${username}`
      // );
      // console.log("timeline");
      // console.log(response.data);
      // setTimeline(response.data);
    }
    if (isSearchView) {
      getAppProfile();
    }
  }, []);

  // TODO add button and retrieve other people's usernames and Spotify usernames
  if (isSearchView) {
    // username prop was passed in as undefined
    let username = profile.username;

    return (
      <div className="search-view-profileheader-component ">
        <div className="profile-picture-wrapper">
          <img src={logo}></img>
          {/* TODO uncomment both out */}
          {/* {profile.images && (
            <img
              className="profile-picture"
              src={profile.images[0].url}
              alt="profile-picture"
              id="profile-picture"
            ></img>
          )} */}
        </div>
        <div className="profile-username-wrapper">
          <span className="profile-username">{username}</span>
          {/* <span className="profile-username">
            Spotify @{profile.display_name}
          </span> */}
        </div>
      </div>
    );
  }

  return (
    <div className="profileheader-component">
      <div className="profile-picture-wrapper">
        {/* {profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
            id="profile-picture"
          ></img>
        )} */}
        <img src={logo}></img>
      </div>
      <div className="profile-username-wrapper">
        <span className="profile-username">{username}</span>
        <span className="profile-username">
          Spotify @{profile.display_name}
        </span>
      </div>
    </div>
  );
}

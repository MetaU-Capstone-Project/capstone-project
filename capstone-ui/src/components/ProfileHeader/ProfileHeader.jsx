// import * as React from "react";
import "./ProfileHeader.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileHeader({
  username,
  profile,
  token,
  isSearchView,
}) {
  console.log("profile header search view");
  console.log(profile);

  // TODO add button and retrieve other people's usernames and Spotify usernames
  if (isSearchView) {
    // username prop was passed in as undefined
    let username = profile.username;

    return (
      <div className="profileheader-component search-view">
        <div className="profile-picture-wrapper">
          {profile.images && (
            <img
              className="profile-picture"
              src={profile.images[0].url}
              alt="profile-picture"
              id="profile-picture"
            ></img>
          )}
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

  return (
    <div className="profileheader-component">
      <div className="profile-picture-wrapper">
        {profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
            id="profile-picture"
          ></img>
        )}
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

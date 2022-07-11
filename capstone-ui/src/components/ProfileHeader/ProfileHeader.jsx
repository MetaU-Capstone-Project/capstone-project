// import * as React from "react";
import "./ProfileHeader.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileHeader({ profile, token }) {
  console.log("profile");
  console.log(profile);

  return (
    <div className="profileheader-component">
      <div className="profile-picture-wrapper">
        {/* TODO profile picture */}
        {/* <img className="profile-picture" src={logo} alt="profile-picture"></img> */}
        {profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
            id="profile-picture"
          ></img>
        )}
        {/* before */}
        {/* <img
          className="profile-picture"
          src={profile.images[0].url}
          alt="profile-picture"
          id="profile-picture"
        ></img> */}
      </div>
      <div className="profile-username-wrapper">
        {/* added */}
        {/* <span className="profile-username">
         Username: {profile.display_name}
        </span> */}
        {/* added */}
        <span className="profile-username">{profile.display_name}</span>
      </div>
    </div>
  );
}

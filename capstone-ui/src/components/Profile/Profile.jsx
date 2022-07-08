import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";

const Parse = require("parse");

export default function Profile({ username, token, profile }) {
  return (
    <div className="profile-page">
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
        ></ProfileCard>
      </div>
      <div className="timeline-wrapper">
        <Timeline
          username={username}
          token={token}
          profile={profile}
        ></Timeline>
      </div>
    </div>
  );
}

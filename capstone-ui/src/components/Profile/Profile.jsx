import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";

const Parse = require("parse");

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="info-wrapper">
        <ProfileCard></ProfileCard>
      </div>
      <div className="timeline-wrapper">
        <Timeline></Timeline>
      </div>
    </div>
  );
}

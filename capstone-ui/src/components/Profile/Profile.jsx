import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { catchErrors } from "../../utils";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";

const Parse = require("parse");

export default function Profile({ username, token, profile }) {
  const [appProfile, setAppProfile] = React.useState();

  // React.useEffect(() => {
  //   const fetchAppUser = async () => {
  //     const { data } = await axios.get("http://localhost:3001/user");
  //     setAppProfile(data);
  //   };

  //   catchErrors(fetchAppUser());
  // }, [appProfile]);

  React.useEffect(() => {
    const fetchAppUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      setAppProfile(data);
    };

    catchErrors(fetchAppUser());
  }, []);

  return (
    <div className="profile-page">
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
          appProfile={appProfile}
        ></ProfileCard>
      </div>
      <div className="timeline-wrapper">
        <span className="timeline-heading">Timeline</span>
        <Timeline
          username={username}
          token={token}
          profile={profile}
        ></Timeline>
      </div>
    </div>
  );
}

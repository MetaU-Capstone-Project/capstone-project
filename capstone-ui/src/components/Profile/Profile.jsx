import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import Settings from "../Settings/Settings";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";
import Followers from "../Followers/Followers";

const Parse = require("parse");

export default function Profile({
  username,
  token,
  profile,
  // timeline,
  // settings,
  // followers,
}) {
  const [appProfile, setAppProfile] = React.useState();
  const [tab, setTab] = React.useState("");

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

  // return (
  //   <div className="profile-page">
  //     <div className="info-wrapper">
  //       <ProfileCard
  //         username={username}
  //         token={token}
  //         profile={profile}
  //         appProfile={appProfile}
  //         isPreferencesView={false}
  //       ></ProfileCard>
  //     </div>
  //     <div className="timeline-wrapper">
  //       <span className="timeline-heading">Timeline</span>
  //       <Timeline
  //         username={username}
  //         token={token}
  //         profile={profile}
  //       ></Timeline>
  //     </div>
  //   </div>
  // );

  return (
    <div className="profile-page">
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
          appProfile={appProfile}
          isPreferencesView={false}
          // added
          tab={tab}
          setTab={setTab}
        ></ProfileCard>
      </div>
      {/* {timeline && (
        <div className="timeline-wrapper">
          <span className="timeline-heading">Timeline</span>
          <Timeline
            username={username}
            token={token}
            profile={profile}
          ></Timeline>
        </div>
      )}
      {settings && (
        <div className="settings-wrapper">
          <span className="settings-heading">Settings</span>
          <Settings
            username={username}
            token={token}
            profile={profile}
          ></Settings>
        </div>
      )}
      {followers && (
        <div className="followers-wrapper">
          <span className="followers-heading">Friends</span>
          <Followers
            username={username}
            token={token}
            profile={profile}
          ></Followers>
        </div>
      )} */}
      {tab == "timeline" && (
        <div className="timeline-wrapper">
          <span className="timeline-heading">Timeline</span>
          <Timeline
            username={username}
            token={token}
            profile={profile}
          ></Timeline>
        </div>
      )}
      {tab == "settings" && (
        <div className="settings-wrapper">
          <span className="settings-heading">Settings</span>
          <Settings
            username={username}
            token={token}
            profile={profile}
          ></Settings>
        </div>
      )}
      {tab == "followers" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Friends</span>
          <Followers
            username={username}
            token={token}
            profile={profile}
          ></Followers>
        </div>
      )}
    </div>
  );
}

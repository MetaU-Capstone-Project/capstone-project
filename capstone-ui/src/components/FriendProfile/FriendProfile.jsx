import React, { useState } from "react";
import "./FriendProfile.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import Settings from "../Settings/Settings";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";
import Followers from "../Followers/Followers";
import { useParams } from "react-router-dom";
import Profile from "../Profile/Profile";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Parse = require("parse");

export default function FriendProfile({ friendUsername, token, profile }) {
  let { username } = useParams();
  const [appProfile, setAppProfile] = React.useState(null);
  const [tab, setTab] = React.useState("timeline");

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/user/${username}`
      );
      setAppProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  if (username === friendUsername) {
    return (
      <>
        {appProfile ? (
          <Profile
            username={friendUsername}
            profile={profile}
            token={token}
            followers={false}
            timeline={true}
            settings={false}
            app={appProfile}
          ></Profile>
        ) : (
          <LoadingSpinner></LoadingSpinner>
        )}
      </>
    );
  }

  return (
    <div className="profile-page">
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
          appProfile={appProfile}
          isPreferencesView={false}
          tab={tab}
          setTab={setTab}
          isFriendProfileView={true}
        ></ProfileCard>
      </div>
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
      {tab == "followers" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Friends</span>
          <Followers
            username={username}
            token={token}
            profile={profile}
            currentUserUsername={friendUsername}
          ></Followers>
        </div>
      )}
    </div>
  );
}

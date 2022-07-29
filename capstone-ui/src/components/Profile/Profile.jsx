import React, { useState } from "react";
import "./Profile.css";
import axios from "axios";
import { catchErrors, showPopup, hidePopup } from "../../utils";
import Settings from "../Settings/Settings";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";
import Followers from "../Followers/Followers";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { useParams } from "react-router-dom";

const Parse = require("parse");

export default function Profile({ username, token, profile }) {
  const [appProfile, setAppProfile] = React.useState();
  const [tab, setTab] = React.useState("timeline");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    useState(false);

  const handleMouseOver = (username) => {
    setIsHovering(true);
    showPopup();
    setHoverUsername(username);
    setShouldUpdateProfileDetails(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    hidePopup();
    setShouldUpdateProfileDetails(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/user/${username}`
      );
      setAppProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="profile-page">
      <div id="overlay">
        <div className="profile-details-wrapper">
          {hoverUsername && (
            <ProfileDetails
              username={hoverUsername}
              setShouldUpdateProfileDetails={shouldUpdateProfileDetails}
            ></ProfileDetails>
          )}
        </div>
      </div>
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
          appProfile={appProfile}
          isPreferencesView={false}
          tab={tab}
          setTab={setTab}
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
            handleMouseOut={handleMouseOut}
            handleMouseOver={handleMouseOver}
          ></Followers>
        </div>
      )}
    </div>
  );
}

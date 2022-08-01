import React from "react";
import "./Profile.css";
import axios from "axios";
import { catchErrors, showPopup, hidePopup } from "../../utils";
import Settings from "../Settings/Settings";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";
import Followers from "../Followers/Followers";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

/**
 * Page to display current user's profile
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {string} props.profile Spotify profile information to be displayed
 */
export default function Profile({ username, profile }) {
  const [appProfile, setAppProfile] = React.useState(null);
  const [tab, setTab] = React.useState("timeline");
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoverUsername, setHoverUsername] = React.useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    React.useState(false);

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

  // Retrieves current user's app profile information
  React.useEffect(() => {
    const fetchData = async () => {
      setAppProfile(
        (await axios.get(`http://localhost:3001/user/${username}`)).data
      );
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
          <Timeline username={username} profile={profile}></Timeline>
        </div>
      )}
      {tab == "settings" && (
        <div className="settings-wrapper">
          <span className="settings-heading">Settings</span>
          <Settings username={username} profile={profile}></Settings>
        </div>
      )}
      {tab == "followers" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Friends</span>
          <Followers username={username}></Followers>
        </div>
      )}
    </div>
  );
}

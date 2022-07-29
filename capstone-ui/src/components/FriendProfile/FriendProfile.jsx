import React, { useState } from "react";
import "./FriendProfile.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import ProfileCard from "../ProfileCard/ProfileCard";
import Timeline from "../Timeline/Timeline";
import Followers from "../Followers/Followers";
import { useParams } from "react-router-dom";
import Profile from "../Profile/Profile";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Page to display specified user's profile
 * @param {object} props Component props
 * @param {string} props.friendUsername Username of profile to be displayed
 * @param {string} props.profile Profile information to be displayed
 */
export default function FriendProfile({ friendUsername, profile }) {
  let { username } = useParams();
  const [appProfile, setAppProfile] = React.useState(null);
  const [tab, setTab] = React.useState("timeline");

  // Retrieve app profile information associated with specified user
  React.useEffect(() => {
    const fetchData = async () => {
      setAppProfile(
        (await axios.get(`http://localhost:3001/user/${username}`)).data
      );
    };

    catchErrors(fetchData());
  }, []);

  // Check if the specified user is the current user, in which case the Profile component should be rendered
  if (username === friendUsername) {
    return (
      <>
        {appProfile != null ? (
          <Profile
            username={friendUsername}
            followers={false}
            timeline={true}
            settings={false}
            app={appProfile}
            profile={profile}
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
          <Timeline username={username} profile={profile}></Timeline>
        </div>
      )}
      {tab == "followers" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Friends</span>
          <Followers
            username={username}
            currentUserUsername={friendUsername}
          ></Followers>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Followers.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component to display specified user's followers
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 */
export default function Followers({ username, currentUserUsername }) {
  const [followers, setFollowers] = useState(null);
  const [shouldUpdateProfileHeader, setShouldUpdateProfileHeader] =
    useState(false);

  // Retrieve all the followers of a specified user
  React.useEffect(() => {
    async function getFollowers() {
      setFollowers(
        (await axios.get(`http://localhost:3001/user/followers/${username}`))
          .data
      );
    }
    getFollowers();
    setShouldUpdateProfileHeader(false);
  }, [shouldUpdateProfileHeader]);

  return (
    <div className="followers-component">
      {followers != null ? (
        followers.map((follower) => (
          <ProfileHeader
            profile={follower}
            key={follower}
            isFollowersView={true}
            username={username}
            currentUserUsername={currentUserUsername}
            setShouldUpdateProfileHeader={setShouldUpdateProfileHeader}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

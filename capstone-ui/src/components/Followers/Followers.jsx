import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Followers.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Followers({
  username,
  token,
  profile,
  currentUserUsername,
  handleMouseOut,
  handleMouseOver,
}) {
  const [followers, setFollowers] = useState(null);
  const [shouldUpdateFollowers, setShouldUpdateFollowers] = useState(false);

  React.useEffect(() => {
    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      setFollowers(response.data);
    }
    getFollowers();
    setShouldUpdateFollowers(false);
  }, [shouldUpdateFollowers]);

  return (
    <div className="followers-component">
      {followers ? (
        followers.map((follower) => (
          <ProfileHeader
            profile={follower}
            key={follower}
            token={token}
            isFollowersView={true}
            username={username}
            currentUserUsername={currentUserUsername}
            setShouldUpdateFollowers={setShouldUpdateFollowers}
            handleMouseOut={handleMouseOut}
            handleMouseOver={handleMouseOver}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

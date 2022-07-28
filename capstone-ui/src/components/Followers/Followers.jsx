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
  const [shouldUpdate, setShouldUpdate] = useState(false);

  React.useEffect(() => {
    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      setFollowers(response.data);
    }
    getFollowers();
    setShouldUpdate(false);
  }, [shouldUpdate]);

  return (
    <div className="followers-component">
      {followers ? (
        followers.map((element) => (
          <ProfileHeader
            profile={element}
            key={element}
            token={token}
            isFollowersView={true}
            username={username}
            currentUserUsername={currentUserUsername}
            setShouldUpdate={setShouldUpdate}
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

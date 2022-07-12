import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Followers.css";
import axios from "axios";

export default function Followers({ username, token, profile }) {
  const [followers, setFollowers] = useState([]);

  React.useEffect(() => {
    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      setFollowers(response.data);
    }
    getFollowers();
  }, []);

  return (
    <div className="followers-component">
      {followers.map((element) => (
        <ProfileHeader
          profile={element}
          key={element.objectId}
          token={token}
          isFollowersView={true}
          username={username}
        ></ProfileHeader>
      ))}
    </div>
  );
}

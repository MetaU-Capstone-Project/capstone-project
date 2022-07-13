import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Followers.css";
import axios from "axios";
import Loader from "../Loader";

export default function Followers({ username, token, profile }) {
  const [followers, setFollowers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    // setIsFetching(true);

    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      setFollowers(response.data);
      // setIsFetching(false);
    }
    getFollowers();
  }, []);

  return (
    <div className="followers-component">
      {followers.map((element) => (
        <ProfileHeader
          profile={element}
          key={element}
          token={token}
          isFollowersView={true}
          username={username}
        ></ProfileHeader>
      ))}
    </div>
  );
}

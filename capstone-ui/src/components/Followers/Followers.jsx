import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Followers.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Followers({ username, token, profile }) {
  const [followers, setFollowers] = useState(null);
  // const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    // setIsFetching(true);

    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      setFollowers(response.data);
      console.log("response.data");
      console.log(response.data);
      // setIsFetching(false);
    }
    getFollowers();
  }, []);

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
          ></ProfileHeader>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

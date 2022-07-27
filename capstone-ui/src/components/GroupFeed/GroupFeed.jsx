import React, { useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./GroupFeed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function GroupFeed({ username, token, profile, groupName }) {
  const [groupFeed, setGroupFeed] = useState(null);

  React.useEffect(() => {
    async function getGroupFeed() {
      const response = await axios.get(
        `http://localhost:3001/user/groupfeed/${groupName}`
      );
      setGroupFeed(response.data);
    }

    getGroupFeed();
  }, []);

  return (
    <div className="groupfeed-component">
      {groupFeed ? (
        groupFeed.map((element) => (
          <PostHeader
            username={element.username}
            post={element}
            key={element.objectId}
            token={token}
            profile={profile}
            isTimelineView={true}
          ></PostHeader>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

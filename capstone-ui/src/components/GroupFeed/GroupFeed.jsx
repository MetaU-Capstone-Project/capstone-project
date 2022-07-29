import React, { useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./GroupFeed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component for displaying the feed associated with the given group name
 * @param {object} props Component props
 * @param {object} props.profile Information about the current user's profile
 * @param {string} props.groupName Specified group's identifier
 */
export default function GroupFeed({ profile, groupName }) {
  const [groupFeed, setGroupFeed] = useState(null);

  // Retrieves the specified group's feed
  React.useEffect(() => {
    async function getGroupFeed() {
      setGroupFeed(
        (await axios.get(`http://localhost:3001/user/groupfeed/${groupName}`))
          .data
      );
    }

    getGroupFeed();
  }, []);

  return (
    <div className="groupfeed-component">
      {groupFeed ? (
        groupFeed.map((post) => (
          <PostHeader
            username={post.username}
            post={post}
            key={post.objectId}
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

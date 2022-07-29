import React, { useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./Timeline.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Timeline({ username, token, profile }) {
  const [timeline, setTimeline] = useState(null);

  React.useEffect(() => {
    async function getTimeline() {
      const response = await axios.get(
        `http://localhost:3001/user/timeline/${username}`
      );
      setTimeline(response.data);
    }

    getTimeline();
  }, []);

  return (
    <div className="timeline-component">
      {timeline ? (
        timeline.map((post) => (
          <PostHeader
            username={username}
            post={post}
            key={post.objectId}
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

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
      console.log("timeline");
      console.log(response.data);
      setTimeline(response.data);
    }

    getTimeline();
  }, []);

  return (
    <div className="timeline-component">
      {timeline ? (
        timeline.map((element) => (
          <PostHeader
            username={username}
            post={element}
            key={element.objectId}
            token={token}
            profile={profile}
          ></PostHeader>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

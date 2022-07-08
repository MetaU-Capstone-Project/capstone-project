// import * as React from "react";
import React, { useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./Timeline.css";
import axios from "axios";

export default function Timeline({ username, token, profile }) {
  const [timeline, setTimeline] = useState([]);

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
  }, [timeline]);

  return (
    <div className="timeline-component">
      {/* TODO for now just hardcode timeline but eventually map props array into PostHeader components*/}
      {/* <PostHeader token={token} profile={profile}></PostHeader>
      <PostHeader token={token} profile={profile}></PostHeader>
      <PostHeader token={token} profile={profile}></PostHeader>
      <PostHeader token={token} profile={profile}></PostHeader> */}
      {/* TODO set with timeline of posts */}
      {timeline.map((element) => (
        <PostHeader post={element} key={element.objectId}></PostHeader>
      ))}
    </div>
  );
}

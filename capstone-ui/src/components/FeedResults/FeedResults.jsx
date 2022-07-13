// import * as React from "react";
import React, { useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./FeedResults.css";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

// TODO props = {page}
export default function FeedResults({ username, feed, token }) {
  console.log("feed results");
  console.log(feed);
  return (
    <div className="feed-results-component">
      {feed && username ? (
        feed.map((element) => (
          // <span key={element.objectId}>{element.username}</span>
          <PostCard
            username={username}
            post={element}
            key={element.objectId}
            token={token}
            song={{ trackId: element.objectId }}
            // profile={profile}
          ></PostCard>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

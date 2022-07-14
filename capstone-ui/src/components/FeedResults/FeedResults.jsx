import React, { useState } from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./FeedResults.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function FeedResults({ username, feed, token }) {
  return (
    <div className="feed-results-component">
      {feed && username ? (
        feed.map((element) => {
          return (
            <FeedPost
              username={username}
              post={element}
              key={element.objectId}
              token={token}
            ></FeedPost>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

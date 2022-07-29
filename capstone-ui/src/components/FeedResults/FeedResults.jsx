import React, { useState } from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./FeedResults.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function FeedResults({ username, feed, token }) {
  return (
    <div className="feed-results-component">
      {feed != null && username != null ? (
        feed.map((post) => {
          return (
            <FeedPost
              username={username}
              post={post}
              key={post.objectId}
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

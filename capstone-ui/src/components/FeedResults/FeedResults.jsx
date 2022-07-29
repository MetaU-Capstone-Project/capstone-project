import React from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./FeedResults.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component to display all the posts of a specified user's feed
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {Array<object>} props.feed Array of current user's feed
 */
export default function FeedResults({ username, feed }) {
  return (
    <div className="feed-results-component">
      {feed != null && username != null ? (
        feed.map((post) => {
          return (
            <FeedPost
              username={username}
              post={post}
              key={post.objectId}
            ></FeedPost>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

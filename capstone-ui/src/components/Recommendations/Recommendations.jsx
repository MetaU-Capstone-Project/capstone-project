import React, { useState } from "react";
import "./Recommendations.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export default function Recommendations({
  username,
  token,
  recs,
  setShouldUpdateFeed,
  handleMouseOut,
  handleMouseOver,
  isFeedView,
}) {
  return (
    <div
      className={
        isFeedView
          ? "feed-view-recommendations-component"
          : "recommendations-component"
      }
    >
      <div className="recommendations-wrapper">
        {recs != null && recs.length === 0 && (
          <span>No recommended users.</span>
        )}
        {recs != null &&
          recs.length > 0 &&
          recs.map((rec) => (
            <ProfileHeader
              profile={rec.username}
              key={rec.username}
              token={token}
              isFollowersView={true}
              username={rec.username}
              currentUserUsername={username}
              setShouldUpdateFeed={setShouldUpdateFeed}
              handleMouseOut={handleMouseOut}
              handleMouseOver={handleMouseOver}
            ></ProfileHeader>
          ))}
      </div>
    </div>
  );
}

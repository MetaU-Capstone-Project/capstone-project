import React, { useState } from "react";
import "./Recommendations.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendationUtils";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export default function Recommendations({
  username,
  token,
  profile,
  recs,
  setShouldUpdateFeed,
}) {
  return (
    <div className="recommendations-component">
      <div className="recommendations-wrapper">
        {recs != null && recs.length === 0 && (
          <span>No recommended users.</span>
        )}
        {recs &&
          recs.length > 0 &&
          recs.map((element) => (
            <ProfileHeader
              profile={element.username}
              key={element.username}
              token={token}
              isFollowersView={true}
              username={element.username}
              currentUserUsername={username}
              setShouldUpdateFeed={setShouldUpdateFeed}
            ></ProfileHeader>
          ))}
      </div>
    </div>
  );
}

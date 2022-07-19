import React, { useState } from "react";
import "./Recommendations.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendation";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export default function Reommendations({ username, token, profile, recs }) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [artistOptions, setArtistOptions] = useState(null);

  // TODO - for selected preferences
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(null);

  console.log("recommendations");
  console.log(recs);
  React.useEffect(() => {}, []);

  return (
    <div className="recommendations-component">
      <div className="recommendations-wrapper">
        {recs &&
          recs.map((element) => (
            <ProfileHeader
              profile={element.username}
              key={element.username}
              token={token}
              //   isFollowersView={true}
              username={element.username}
              currentUserUsername={username}
            ></ProfileHeader>
          ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./ProfileDetails.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendationUtils";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileCard from "../ProfileCard/ProfileCard";

export default function ProfileDetails({
  username,
  token,
  profile,
  recs,
  setShouldUpdateProfileDetails,
}) {
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      let savedTopGenres = await axios.get(
        `http://localhost:3001/user/topgenres/${username}`
      );
      setSelectedGenres(savedTopGenres.data.slice(0, 5));

      setIsFetching(false);
    };

    catchErrors(fetchData());
  }, [setShouldUpdateProfileDetails]);

  return (
    <div className="profiledetails-component">
      {!isFetching && selectedGenres && (
        <>
          <div className="profiledetails-name">{username}</div>
          <div className="profiledetails-wrapper">
            Top Genres:
            <div className="profiledetails-list">
              {selectedGenres.map((element) => (
                <span className="profiledetails-preference" key={element.value}>
                  {element.value}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

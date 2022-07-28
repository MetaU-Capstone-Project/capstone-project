import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Recommendations from "../Recommendations/Recommendations";
import { catchErrors, showPopup, hidePopup } from "../../utils";
import { getRecommendedUsers } from "../../recommendationUtils";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

export default function Feed({ username, profile, token }) {
  const [feed, setFeed] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [shouldUpdateFeed, setShouldUpdateFeed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(null);
  const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] =
    useState(false);

  const handleMouseOver = (username) => {
    setIsHovering(true);
    showPopup();
    setHoverUsername(username);
    setShouldUpdateProfileDetails(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    hidePopup();
    setShouldUpdateProfileDetails(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/user/feed/${username}`
      );
      setFeed(response.data);

      let genresResult = await axios.get(
        `http://localhost:3001/user/topgenres/${username}`
      );
      let artistsResult = await axios.get(
        `http://localhost:3001/user/topartists/${username}`
      );
      let postedSongs = [];
      let recs = await getRecommendedUsers(
        username,
        genresResult.data,
        artistsResult.data
      );
      setRecommendations(recs);
    };

    catchErrors(fetchData());
    setShouldUpdateFeed(false);
  }, [shouldUpdateFeed]);

  return (
    <>
      {feed ? (
        <>
          <div id="overlay">
            <div className="profile-details-wrapper">
              {hoverUsername && (
                <ProfileDetails
                  username={hoverUsername}
                  setShouldUpdateProfileDetails={shouldUpdateProfileDetails}
                ></ProfileDetails>
              )}
            </div>
          </div>
          <div className="feed-page">
            {recommendations && (
              <div className="recommendation-component-wrapper">
                <div className="recommendation-heading-wrapper">
                  <span className="recommendation-heading">
                    Recommended Users
                  </span>
                </div>
                <Recommendations
                  recs={recommendations}
                  username={username}
                  setShouldUpdateFeed={setShouldUpdateFeed}
                  handleMouseOut={handleMouseOut}
                  handleMouseOver={handleMouseOver}
                ></Recommendations>
              </div>
            )}
            <div className="feed-heading-wrapper">
              <span className="feed-heading">Your Feed</span>
            </div>
            <div className="feed-results-wrapper">
              <FeedResults
                feed={feed}
                username={username}
                token={token}
              ></FeedResults>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

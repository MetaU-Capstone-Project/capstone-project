import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Recommendations from "../Recommendations/Recommendations";
import { catchErrors, showPopup, hidePopup } from "../../utils";
import { getRecommendedUsers } from "../../recommendationUtils";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

/**
 * Page to display specified user's recommended users and feed
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 */
export default function Feed({ username }) {
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
      const feedResult = await axios.get(
        `http://localhost:3001/user/feed/${username}`
      );
      setFeed(feedResult.data);

      // Retrieve specified user's recommended users based on their genres and artist preferences
      setRecommendations(
        await getRecommendedUsers(
          username,
          (
            await axios.get(`http://localhost:3001/user/topgenres/${username}`)
          ).data,
          (
            await axios.get(`http://localhost:3001/user/topartists/${username}`)
          ).data,
          []
        )
      );
    };

    catchErrors(fetchData());
    setShouldUpdateFeed(false);
  }, [shouldUpdateFeed]);

  return (
    <>
      {feed != null ? (
        <>
          <div id="overlay">
            <div className="profile-details-wrapper">
              {hoverUsername != null && (
                <ProfileDetails
                  username={hoverUsername}
                  setShouldUpdateProfileDetails={shouldUpdateProfileDetails}
                ></ProfileDetails>
              )}
            </div>
          </div>
          <div className="feed-page">
            {recommendations != null && (
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
              <FeedResults feed={feed} username={username}></FeedResults>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Recommendations from "../Recommendations/Recommendations";
import { catchErrors } from "../../utils";
import { getRecommendedUsers } from "../../recommendationUtils";

/**
 * Page to display specified user's recommended users and feed
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 */
export default function Feed({ username }) {
  const [feed, setFeed] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [shouldUpdateFeed, setShouldUpdateFeed] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      // Retrieve specified user's feed
      setFeed(
        (await axios.get(`http://localhost:3001/user/feed/${username}`)).data
      );

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

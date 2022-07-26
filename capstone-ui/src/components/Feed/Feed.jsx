import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Recommendations from "../Recommendations/Recommendations";
import { catchErrors } from "../../utils";
import { getRecommendedUsers } from "../../recommendationUtils";

export default function Feed({ username, profile, token }) {
  const [feed, setFeed] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [shouldUpdateFeed, setShouldUpdateFeed] = useState(false);

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

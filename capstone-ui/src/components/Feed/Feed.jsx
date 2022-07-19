import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Recommendations from "../Recommendations/Recommendations";
import { catchErrors } from "../../utils";
import { getRecommendedUsers } from "../../recommendation";

export default function Feed({ username, profile, token }) {
  const [feed, setFeed] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

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
      // TODO remove posted songs
      let postedSongs = [];
      let recs = await getRecommendedUsers(
        username,
        genresResult.data,
        artistsResult.data,
        postedSongs
      );
      setRecommendations(recs);
    };

    catchErrors(fetchData());
  }, []);

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
                <Recommendations recs={recommendations}></Recommendations>
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
    // TODO playback component
    // <iframe
    //   // style="border-radius:12px"
    //   src="https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2?utm_source=generator"
    //   width="100%"
    //   height="380"
    //   frameBorder="0"
    //   allowFullScreen=""
    //   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    // ></iframe>
  );
}

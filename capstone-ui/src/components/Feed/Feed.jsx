import React, { useState } from "react";
import FeedResults from "../FeedResults/FeedResults";
import "./Feed.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Feed({ username, profile, token }) {
  const [feed, setFeed] = useState(null);

  console.log("feed username");
  console.log(username);

  React.useEffect(() => {
    async function getFeed() {
      const response = await axios.get(
        `http://localhost:3001/user/feed/${username}`
      );
      setFeed(response.data);
    }
    getFeed();
  }, []);

  // TODO style the loader to be in center
  return (
    <>
      {feed ? (
        <>
          <div className="feed-page">
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

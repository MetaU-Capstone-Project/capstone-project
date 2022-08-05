import React, { useState, useCallback, useEffect, useRef } from "react";
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

  // Indicates whether results are being retrieved from backend
  const [loading, setLoading] = useState(false);

  // Display popup if user hovers over a profile
  const handleMouseOver = (username) => {
    setIsHovering(true);
    showPopup();
    setHoverUsername(username);
    setShouldUpdateProfileDetails(true);
  };

  // Hide popup if user stops hovering over a profile
  const handleMouseOut = () => {
    setIsHovering(false);
    hidePopup();
    setShouldUpdateProfileDetails(false);
  };

  function useFetch(page) {
    const getFeedResults = useCallback(async () => {
      try {
        setLoading(true);
        // If user scrolls down for more feed results, present previously scrolled past results
        let oldFeedResults = feed === null ? [] : feed;

        // Render five posts at a time as user scrolls down
        const songResponse = await axios.post(
          `http://localhost:3001/user/feedpage`,
          {
            username: username,
            limit: 5,
            page: page,
          }
        );

        setFeed(oldFeedResults.concat(songResponse.data));
        setLoading(false);
      } catch (err) {
        alert(`Error loading more feed results for ${username}`);
      }
    }, [page]);

    useEffect(() => {
      getFeedResults();
    }, [getFeedResults]);

    return { loading, feed };
  }

  function useInfiniteScroll() {
    const [page, setPage] = useState(0);
    const loadMoreRef = useRef(null);

    const handleInfiniteScrollingObserver = useCallback((viewingTarget) => {
      // If the results have reached the loading spinner, increase the page to offset the next search results
      if (viewingTarget[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, []);

    useEffect(() => {
      const option = {
        root: null,
        rootMargin: "1000px",
        threshold: 0,
      };

      const infiniteScrollingObserver = new IntersectionObserver(
        handleInfiniteScrollingObserver,
        option
      );
      if (loadMoreRef.current)
        infiniteScrollingObserver.observe(loadMoreRef.current);
    }, [handleInfiniteScrollingObserver]);

    return { loadMoreRef, page };
  }

  const { loadMoreRef, page } = useInfiniteScroll();
  useFetch(page);

  const [isInitialRender, setIsInitialRender] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsInitialRender(true);

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

      setIsInitialRender(false);
    };

    catchErrors(fetchData());
    setShouldUpdateFeed(false);
  }, [shouldUpdateFeed]);

  return (
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
        {/* Allow time for the results to render so that loading spinner is not made visible and triggers multiple calls to backend at once */}
        {isInitialRender && <div className="feed-placeholder"></div>}
        {recommendations != null && (
          <div className="recommendation-component-wrapper">
            <div className="recommendation-heading-wrapper">
              <span className="recommendation-heading">Recommended Users</span>
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
      <div className="feed-placeholder"></div>
      <div ref={loadMoreRef} className="search-loading-spinner">
        {loading && <LoadingSpinner></LoadingSpinner>}
      </div>
    </>
  );
}

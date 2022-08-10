import React, { useState } from "react";
import axios from "axios";
import "./ProfileHeader.css";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component to display profile picture and username of specified user
 * @param {object} props Component props
 * @param {string} props.username Username of specified user
 * @param {object} props.profile Spotify profile information associated with specified user
 * @param {boolean} props.isSearchView Indicates whether component is being rendered in the search page
 * @param {boolean} props.isFollowersView Indicates whether component is being rendered in the followers tab of the profile page
 * @param {boolean} props.isFeedView Indicates whether component is being rendered in the feed page
 * @param {boolean} props.isTimelineView Indicates whether component is being rendered in the timeline tab of the profile page
 * @param {Function} props.handleMouseOver Handler to display popup with profile details if mouse hovers over component
 * @param {Function} props.handleMouseOut Handler to hide popup if mouse stops hovering over component
 * @param {Function} props.setShouldUpdate Handler to rerender parent component if follow/unfollow status changes
 * @param {Function} props.setShouldUpdateFeed Handler to rerender feed page if follow/unfollow status changes
 */
export default function ProfileHeader({
  username,
  profile,
  isSearchView,
  isFollowersView,
  isFeedView,
  isTimelineView,
  currentUserUsername,
  handleMouseOver,
  handleMouseOut,
  setShouldUpdateProfileHeader,
  setShouldUpdateFeed,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  if (currentUserUsername) {
    username = currentUserUsername;
  }

  React.useEffect(() => {
    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      // Checks if user is following user whose profile is being displayed, and sets following status accordingly
      setIsFollowing(
        response.data.includes(profile.usernamee) ||
          response.data.includes(profile)
      );
    }
    getFollowers();

    async function getProfileImage(usernameParam) {
      setImageURL(
        (await axios.get(`http://localhost:3001/user/${usernameParam}`)).data
          .imageURL
      );
    }

    // Retrieves profile image from Spotify profile given a username
    if (isSearchView || isFollowersView) {
      getProfileImage(profile.username || profile);
    } else {
      getProfileImage(username);
    }
  }, []);

  // Follows user on success and displays message, and rerenders the parent component if successful
  const followUser = async (e) => {
    let followUsername =
      e.target.parentNode.childNodes[1].childNodes[0].childNodes[0].innerText;

    e.preventDefault();
    axios
      .post("http://localhost:3001/user/followUser", {
        followUsername: followUsername,
      })
      .then(function (response) {
        alert(`You are now following ${followUsername}!`);
        setIsFollowing(true);
      })
      .catch(function (error) {
        alert(`Error! ${error.message}`);
      });

    if (
      setShouldUpdateProfileHeader &&
      typeof setShouldUpdateProfileHeader == "function"
    ) {
      setShouldUpdateProfileHeader(true);
    }

    if (setShouldUpdateFeed && typeof setShouldUpdateFeed == "function") {
      setShouldUpdateFeed(true);
    }
  };

  // Unfollows user on success and displays message, and rerenders the parent component if successful
  const unfollowUser = async (e) => {
    let unfollowUsername =
      e.target.parentNode.childNodes[1].childNodes[0].childNodes[0].innerText;

    e.preventDefault();
    axios
      .post("http://localhost:3001/user/unfollowUser", {
        unfollowUsername: unfollowUsername,
      })
      .then(function (response) {
        alert(`You have unfollowed ${unfollowUsername}.`);
        setIsFollowing(false);
      })
      .catch(function (error) {
        alert(`Error! ${error.message}`);
      });

    if (
      setShouldUpdateProfileHeader &&
      typeof setShouldUpdateProfileHeader == "function"
    ) {
      setShouldUpdateProfileHeader(true);
    }

    if (setShouldUpdateFeed && typeof setShouldUpdateFeed == "function") {
      setShouldUpdateFeed(true);
    }
  };

  if (isSearchView || isFollowersView) {
    let username = profile.username || profile;

    return (
      <div className="search-view-profileheader-component">
        <div
          className="search-view-profile-picture-wrapper"
          onMouseOver={() => handleMouseOver(username)}
          onMouseOut={handleMouseOut}
        >
          {imageURL === "logo" && (
            <img className="spotify-profileheader-picture" src={logo}></img>
          )}
          {imageURL !== "logo" && (
            <img className="spotify-profileheader-picture" src={imageURL}></img>
          )}
        </div>
        <Link to={`/friendprofile/${username}`}>
          <div className="profile-username-wrapper">
            <span className="profile-username">{username}</span>
          </div>
        </Link>
        {/* Renders follow/unfollow buttons if current user's profile is being rendered from the view of another user's followers list */}
        {((currentUserUsername == undefined && isFollowing) ||
          (currentUserUsername != undefined &&
            currentUserUsername != username &&
            isFollowing)) && (
          <button className="unfollow-button" onClick={unfollowUser}>
            Unfollow
          </button>
        )}
        {((currentUserUsername == undefined && !isFollowing) ||
          (currentUserUsername != undefined &&
            currentUserUsername != username &&
            !isFollowing)) && (
          <button className="follow-button" onClick={followUser}>
            Follow
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {imageURL != null ? (
        <div
          className={
            isFeedView
              ? "feedview-profileheader-component"
              : "profileheader-component"
          }
        >
          <Link to={`/friendprofile/${username}`}>
            <div
              className={
                isFeedView
                  ? "feedview-profile-picture-wrapper"
                  : "profile-picture-wrapper"
              }
            >
              {imageURL === "logo" && (
                <img className="spotify-profileheader-picture" src={logo}></img>
              )}
              {imageURL !== "logo" && (
                <img
                  className="spotify-profileheader-picture"
                  src={imageURL}
                ></img>
              )}
            </div>
            <div
              className={
                isFeedView
                  ? "feedview-profile-username-wrapper"
                  : "profile-username-wrapper"
              }
            >
              <span
                className={
                  isTimelineView
                    ? "timeline-view-profile-username"
                    : "profile-username"
                }
              >
                {username}
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
}

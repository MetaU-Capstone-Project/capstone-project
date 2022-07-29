import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileHeader.css";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

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
  setShouldUpdateFollowers,
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
      setFollowers(response.data);

      let viewUsername = profile.username;
      // first condition is for search view, second condition is for profile view - refactor
      if (
        response.data.includes(viewUsername) ||
        response.data.includes(profile)
      ) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
    getFollowers();

    async function getProfileImage(usernameParam) {
      const response = await axios.get(
        `http://localhost:3001/user/${usernameParam}`
      );
      setImageURL(response.data.imageURL);
    }

    if (isSearchView || isFollowersView) {
      let usernameParam = profile.username || profile;
      getProfileImage(usernameParam);
    } else {
      getProfileImage(username);
    }
  }, []);

  // follows user on success and displays message, and rerenders the parent component if successful
  const followUser = async (e) => {
    let followUsername =
      e.target.parentNode.childNodes[1].childNodes[0].childNodes[0].innerText;

    e.preventDefault();
    axios
      .post("http://localhost:3001/user/followUser", {
        currUsername: username,
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

    if (
      setShouldUpdateFollowers &&
      typeof setShouldUpdateFollowers == "function"
    ) {
      setShouldUpdateFollowers(true);
    }
  };

  // unfollows user on success and displays message, and rerenders the parent component if successful
  const unfollowUser = async (e) => {
    let unfollowUsername =
      e.target.parentNode.childNodes[1].childNodes[0].childNodes[0].innerText;

    e.preventDefault();
    axios
      .post("http://localhost:3001/user/unfollowUser", {
        currUsername: username,
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

    if (
      setShouldUpdateFollowers &&
      typeof setShouldUpdateFollowers == "function"
    ) {
      setShouldUpdateFollowers(true);
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
        {((!currentUserUsername && isFollowing) ||
          (currentUserUsername &&
            currentUserUsername != username &&
            isFollowing)) && (
          <button className="unfollow-button" onClick={unfollowUser}>
            Unfollow
          </button>
        )}
        {((!currentUserUsername && !isFollowing) ||
          (currentUserUsername &&
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
      {imageURL ? (
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

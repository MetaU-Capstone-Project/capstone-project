import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileHeader.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function ProfileHeader({
  username,
  profile,
  token,
  isSearchView,
  isFollowersView,
  isFeedView,
  isTimelineView,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  React.useEffect(() => {
    async function getFollowers() {
      const response = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );
      setFollowers(response.data);

      let viewUsername = profile.username;
      // TODO first condition is for search view, second condition is for profile view - refactor
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
  }, []);

  const followUser = async (e) => {
    let followUsername =
      e.target.parentNode.childNodes[1].childNodes[0].innerText;

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
  };

  const unfollowUser = async (e) => {
    let unfollowUsername =
      e.target.parentNode.childNodes[1].childNodes[0].innerText;

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
  };

  // TODO add button and retrieve other people's usernames and Spotify usernames
  if (isSearchView) {
    // username prop was passed in as undefined
    let username = profile.username;

    return (
      <div className="search-view-profileheader-component">
        <div className="profile-picture-wrapper">
          <img src={logo}></img>
          {/* TODO uncomment both out */}
          {/* {profile.images && (
            <img
              className="profile-picture"
              src={profile.images[0].url}
              alt="profile-picture"
              id="profile-picture"
            ></img>
          )} */}
        </div>
        <div className="profile-username-wrapper">
          <span className="profile-username">{username}</span>
          {/* <span className="profile-username">
            Spotify @{profile.display_name}
          </span> */}
        </div>
        {isFollowing ? (
          <button className="unfollow-button" onClick={unfollowUser}>
            Unfollow
          </button>
        ) : (
          <button className="follow-button" onClick={followUser}>
            Follow
          </button>
        )}
      </div>
    );
  }

  if (isFollowersView) {
    // TODO add link so clickable and can view follower's profile
    return (
      <div className="profileheader-component">
        <div className="profile-picture-wrapper">
          {/* {profile.images && (
            <img
              className="profile-picture"
              src={profile.images[0].url}
              alt="profile-picture"
              id="profile-picture"
            ></img>
          )} */}
          <img src={logo}></img>
        </div>
        <div className="profile-username-wrapper">
          <span className="profile-username">{profile}</span>
          {/* can't retrieve display name */}
          {/* <span className="profile-username">
            Spotify @{profile.display_name}
          </span> */}
        </div>
        {/* {isFollowing ? (
          <button className="unfollow-button" onClick={unfollowUser}>
            Unfollow
          </button>
        ) : (
          <button className="follow-button" onClick={followUser}>
            Follow
          </button>
        )} */}
      </div>
    );
  }

  // return (
  //   <div
  //     className={
  //       isFeedView
  //         ? "feedview-profileheader-component"
  //         : "profileheader-component"
  //     }
  //   >
  //     <div className="profile-picture-wrapper">
  //       {/* {profile.images && (
  //         <img
  //           className="profile-picture"
  //           src={profile.images[0].url}
  //           alt="profile-picture"
  //           id="profile-picture"
  //         ></img>
  //       )} */}
  //       <img src={logo}></img>
  //     </div>
  //     <div className="profile-username-wrapper">
  //       <span className="profile-username">{username}</span>
  //       {/* profile.display name for normal and spotifyUsername for feed */}
  //       <span className="profile-username">
  //         Spotify @
  //         {profile.display_name
  //           ? profile.display_name
  //           : profile.spotifyUsername}
  //       </span>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className={
        isFeedView
          ? "feedview-profileheader-component"
          : "profileheader-component"
      }
    >
      <div
        className={
          isFeedView
            ? "feedview-profile-picture-wrapper"
            : "profile-picture-wrapper"
        }
      >
        {/* {profile.images && (
          <img
            className="profile-picture"
            src={profile.images[0].url}
            alt="profile-picture"
            id="profile-picture"
          ></img>
        )} */}
        <img src={logo}></img>
      </div>
      <div
        className={
          isFeedView
            ? "feedview-profile-username-wrapper"
            : "profile-username-wrapper"
        }
      >
        {/* originally working */}
        {/* profile.display name for normal and spotifyUsername for feed */}
        {/* <span className="profile-username">{username}</span>
        <span className="profile-username">
          Spotify @
          {profile.display_name
            ? profile.display_name
            : profile.spotifyUsername}
        </span> */}

        <span
          className={
            isTimelineView
              ? "timeline-view-profile-username"
              : "profile-username"
          }
        >
          {username}
        </span>
        <span
          className={
            isTimelineView
              ? "timeline-view-profile-username"
              : "profile-username"
          }
        >
          Spotify @
          {profile.display_name
            ? profile.display_name
            : profile.spotifyUsername}
        </span>
      </div>
    </div>
  );
}

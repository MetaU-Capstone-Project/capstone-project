import React from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";
import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import "./Home.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FriendProfile from "../FriendProfile/FriendProfile";
import Group from "../Group/Group";
import Chat from "../Chat/Chat";

/**
 * Page that renders which page the user is currently on
 * @param {object} props Component props
 * @param {string} props.username of current user
 * @param {string} props.page Identifier of which page the user is viewing
 * @param {object} props.profile Spotify profile of current user
 */
export default function Home({ username, page, profile }) {
  return (
    <>
      {username != null ? (
        <div className="home-page">
          <Navbar />
          {page === "home" && <Feed username={username}></Feed>}
          {page === "search" && <Search username={username}></Search>}
          {page === "groups" && (
            <Groups username={username} profile={profile}></Groups>
          )}
          {page === "profile" && (
            <Profile username={username} profile={profile}></Profile>
          )}
          {page === "friendprofile" && (
            <FriendProfile
              friendUsername={username}
              profile={profile}
            ></FriendProfile>
          )}
          {page === "post" && (
            <Post username={username} profile={profile}></Post>
          )}
          {page === "group" && (
            <Group username={username} profile={profile}></Group>
          )}
          {page === "chat" && (
            <Chat username={username} profile={profile}></Chat>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

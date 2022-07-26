import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";
import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import axios from "axios";
import { catchErrors } from "../../utils";
import "./Home.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FriendProfile from "../FriendProfile/FriendProfile";
import Group from "../Group/Group";

export default function Home({ username, page, token, profile, appProfile }) {
  return (
    <>
      {username ? (
        <div className="home-page">
          <Navbar username={username}></Navbar>
          {page === "home" && (
            <Feed username={username} profile={profile} token={token}></Feed>
          )}
          {page === "search" && (
            <Search
              username={username}
              profile={profile}
              token={token}
            ></Search>
          )}
          {page === "groups" && (
            <Groups
              username={username}
              profile={profile}
              token={token}
            ></Groups>
          )}
          {page === "profile" && (
            <Profile
              username={username}
              profile={profile}
              token={token}
              followers={false}
              timeline={true}
              settings={false}
              app={appProfile}
            ></Profile>
          )}
          {page === "friendprofile" && (
            <FriendProfile
              friendUsername={username}
              profile={profile}
              token={token}
              followers={false}
              timeline={true}
              settings={false}
              app={appProfile}
            ></FriendProfile>
          )}
          {page === "post" && (
            <Post username={username} token={token} profile={profile}></Post>
          )}
          {page === "timeline" && (
            <Profile
              username={username}
              profile={profile}
              token={token}
              followers={false}
              timeline={true}
              settings={false}
              app={appProfile}
            ></Profile>
          )}
          {page === "preferences" && (
            <Profile
              username={username}
              profile={profile}
              token={token}
              followers={false}
              timeline={false}
              settings={true}
              app={appProfile}
            ></Profile>
          )}
          {page === "followers" && (
            <Profile
              username={username}
              profile={profile}
              token={token}
              followers={true}
              timeline={false}
              settings={false}
              app={appProfile}
            ></Profile>
          )}
          {page === "group" && (
            <Group
              username={username}
              profile={profile}
              token={token}
              app={appProfile}
            ></Group>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

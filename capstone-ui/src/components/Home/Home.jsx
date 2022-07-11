// import * as React from "react";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";
import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Preferences from "../Preferences/Preferences";

import "./Home.css";

// TODO props = {page}
export default function Home({ username, page, token, profile }) {
  return (
    <div className="home-page">
      <Navbar></Navbar>
      {page === "feed" && (
        <Feed username={username} profile={profile} token={token}></Feed>
      )}
      {page === "search" && (
        <Search username={username} profile={profile} token={token}></Search>
      )}
      {page === "groups" && (
        <Groups username={username} profile={profile} token={token}></Groups>
      )}
      {page === "profile" && (
        <Profile username={username} profile={profile} token={token}></Profile>
      )}
      {page === "post" && (
        <Post username={username} token={token} profile={profile}></Post>
      )}
      {page === "preferences" && (
        <Preferences
          username={username}
          token={token}
          profile={profile}
        ></Preferences>
      )}
    </div>
  );
}

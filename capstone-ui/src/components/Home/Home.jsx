// import * as React from "react";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";
import Profile from "../Profile/Profile";
import Post from "../Post/Post";

import "./Home.css";

// TODO props = {page}
export default function Home({ page, token, profile }) {
  return (
    <div className="home-page">
      <Navbar></Navbar>
      {page === "feed" && <Feed profile={profile} token={token}></Feed>}
      {page === "search" && <Search profile={profile} token={token}></Search>}
      {page === "groups" && <Groups profile={profile} token={token}></Groups>}
      {page === "profile" && (
        <Profile profile={profile} token={token}></Profile>
      )}
      {page === "post" && <Post token={token} profile={profile}></Post>}
    </div>
  );
}

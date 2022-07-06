// import * as React from "react";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";

import "./Home.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

// TODO props = {page}
export default function Home({ page }) {
  return (
    <div className="home-page">
      <Navbar></Navbar>
      {page === "feed" && <Feed></Feed>}
      {page === "search" && <Search></Search>}
      {page === "groups" && <Groups></Groups>}
    </div>
  );
}

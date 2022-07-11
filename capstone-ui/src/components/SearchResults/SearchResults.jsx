// import * as React from "react";
import React from "react";
import "./SearchResults.css";

import PostCard from "../PostCard/PostCard";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import PostHeader from "../PostHeader/PostHeader";
import SongHeader from "../SongHeader/SongHeader";
import axios from "axios";

import { Link } from "react-router-dom";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchResults({
  username,
  songResults,
  profileResults,
  token,
  isSongResults,
}) {
  let results;
  if (isSongResults) {
    results = songResults;
  } else {
    console.log("coffee");
    results = profileResults;
    console.log(profileResults);
  }

  // return (
  //   <div className="searchresults-component">
  //     {results &&
  //       results.length > 0 &&
  //       results.map((element) => (
  //         // kinda working
  //         // <Link to={`/post/${element.id}`} key={element.id}>
  //         //   <SongHeader key={element.id} song={element}></SongHeader>
  //         // </Link>

  //         <SongHeader key={element.id} song={element}></SongHeader>
  //       ))}
  //   </div>
  // );

  return (
    <div className="searchresults-component">
      {isSongResults &&
        results &&
        results.length > 0 &&
        results.map((element) => (
          <SongHeader key={element.id} song={element}></SongHeader>
        ))}
      {/* {!isSongResults &&
        results &&
        results.length > 0 &&
        results.map((element) => (
          <ProfileHeader key={element.id} song={element}></ProfileHeader>
        ))} */}
    </div>
  );
}

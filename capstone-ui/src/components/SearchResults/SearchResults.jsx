// import * as React from "react";
import "./SearchResults.css";

import PostCard from "../PostCard/PostCard";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import PostHeader from "../PostHeader/PostHeader";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchResults() {
  return (
    <div className="searchresults-component">
      {/* <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard> */}

      {/* <ProfileHeader></ProfileHeader>
      <ProfileHeader></ProfileHeader>
      <ProfileHeader></ProfileHeader> */}

      <PostHeader></PostHeader>
      <PostHeader></PostHeader>
      <PostHeader></PostHeader>
    </div>
  );
}

// import * as React from "react";
import "./SearchResults.css";

import PostCard from "../PostCard/PostCard";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import PostHeader from "../PostHeader/PostHeader";
import SongHeader from "../SongHeader/SongHeader";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function SearchResults({ results }) {
  // working
  // console.log("results!!");
  // if (results && results.length > 0) {
  //   console.log("0 element");
  //   console.log(results[0]);
  //   console.log("album: " + results[0].album.images[0].url);
  //   return <img src={results[0].album.images[0].url}></img>;
  // }

  return (
    <div className="searchresults-component">
      {results &&
        results.length > 0 &&
        results.map((element) => (
          <SongHeader key={element.id} song={element}></SongHeader>
        ))}
    </div>
  );
}

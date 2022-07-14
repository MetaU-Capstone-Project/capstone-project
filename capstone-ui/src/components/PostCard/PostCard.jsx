// import * as React from "react";
import React from "react";
import "./PostCard.css";
import axios from "axios";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function PostCard({ username, profile, token, song }) {
  // const [isProfileLoaded, setIsProfileLoaded] = React.useState(true);
  // const [isSongLoaded, setIsSongLoaded] = React.useState(true);
  // const [songInfo, setSongInfo] = React.useState(song);

  // TODO get setters for profile and song state variables
  // React.useEffect(() => {
  //   async function getTrack() {
  //     const response = await axios.get(
  //       `https://api.spotify.com/v1/tracks/${song.trackId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setSongInfo(response.data);
  //   }

  //   // if (profile === undefined) {
  //   //   console.log("profile is undefined");
  //   //   setIsProfileLoaded(false);
  //   // }

  //   if (song.name === undefined) {
  //     console.log("song name is undefined");
  //     // setIsSongLoaded(false);
  //     getTrack();
  //   }
  // }, []);

  if (song == {}) {
    // TODO
    return <div>No song</div>;
  }

  // console.log("song info");
  // console.log(songInfo);

  return (
    <div className="postcard-component">
      <div className="profileheader-wrapper">
        <ProfileHeader
          username={username}
          profile={profile}
          token={token}
          // added 6/11
          isSearchView={false}
        ></ProfileHeader>
      </div>
      <div className="songcard-wrapper">
        <SongCard
          username={username}
          profile={profile}
          token={token}
          song={song}
        ></SongCard>
      </div>
    </div>
  );
}

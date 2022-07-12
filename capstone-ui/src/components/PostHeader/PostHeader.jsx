import React, { useState } from "react";
import "./PostHeader.css";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeaderView from "../SongHeaderView/SongHeaderView";
import axios from "axios";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function PostHeader({ username, post, token, profile }) {
  const [songInfo, setSongInfo] = useState({});

  React.useEffect(() => {
    async function getTrack() {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${post.trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSongInfo(response.data);
    }

    getTrack();
  }, []);

  return (
    <div className="postheader-component">
      <div className="post-info-wrapper">
        {/* TODO modified 6/11 */}
        <ProfileHeader
          token={token}
          profile={profile}
          isSearchView={false}
          username={username}
        ></ProfileHeader>
        <span>{post.createdAt}</span>
      </div>
      <SongHeaderView id="songcard-component" song={songInfo}></SongHeaderView>

      {/* before */}
      {/* <SongHeader id="songcard-component"></SongHeader> */}
    </div>
  );
}

import React, { useState } from "react";
import "./PostHeader.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongHeaderView from "../SongHeaderView/SongHeaderView";
import axios from "axios";
import { formatDate } from "../../utils";

export default function PostHeader({
  username,
  post,
  token,
  profile,
  isTimelineView,
}) {
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
      <div
        className={
          isTimelineView ? "timeline-post-info-wrapper" : "post-info-wrapper"
        }
      >
        <ProfileHeader
          token={token}
          profile={profile}
          isSearchView={false}
          username={username}
          isTimelineView={isTimelineView}
        ></ProfileHeader>
        <span className="timeline-view-date">{formatDate(post.createdAt)}</span>
      </div>
      <SongHeaderView id="songcard-component" song={songInfo}></SongHeaderView>
    </div>
  );
}

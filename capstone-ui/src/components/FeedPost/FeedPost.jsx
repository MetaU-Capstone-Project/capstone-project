import React from "react";
import "./FeedPost.css";
import axios from "axios";
import { getTrack } from "../../spotify";
import { catchErrors } from "../../utils";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";

export default function FeedPost({ username, token, post }) {
  const [songInfo, setSongInfo] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const songResponse = await getTrack(post.trackId);
      const { data } = await axios.get(
        `http://localhost:3001/user/${post.username}`
      );
      setSongInfo(songResponse.data);
      setProfile(data);

      console.log("feed post:");
      console.log("profile:");
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="feedpost-component">
      {/* TODO loader change to conditional rendering ? : */}
      {songInfo && profile && (
        <>
          <ProfileHeader
            className="feedpost-songheader"
            username={profile.username}
            profile={profile}
            token={token}
            isFeedView={true}
            isSearchView={false}
          ></ProfileHeader>
          <div className="songcard-wrapper">
            <SongCard
              username={username}
              profile={profile}
              token={token}
              song={songInfo}
              isFeedView={true}
            ></SongCard>
          </div>
        </>
      )}
    </div>
  );
}

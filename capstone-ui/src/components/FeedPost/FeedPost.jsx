import React from "react";
import "./FeedPost.css";
import axios from "axios";
import { getTrack } from "../../spotify";
import { catchErrors } from "../../utils";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SongCard from "../SongCard/SongCard";
import { formatDate } from "../../utils";

/**
 * Component to display specified feed post
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {object} props.post Information about specified feed post
 */
export default function FeedPost({ username, post }) {
  const [songInfo, setSongInfo] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      // Retrieves information from Spotify API about song associated with specified post
      setSongInfo((await getTrack(post.trackId)).data);

      // Retrieves app profile information about user associated with specified post
      setProfile(
        (await axios.get(`http://localhost:3001/user/${post.username}`)).data
      );
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="feedpost-component">
      {songInfo != null && profile != null && (
        <>
          <div className="profileheader-wrapper">
            <ProfileHeader
              className="feedpost-songheader"
              username={profile.username}
              profile={profile}
              isFeedView={true}
              isSearchView={false}
              handleMouseOut={() => {}}
              handleMouseOver={() => {}}
            ></ProfileHeader>
            <span className="timeline-view-date">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <div className="songcard-wrapper">
            <SongCard
              username={username}
              profile={profile}
              song={songInfo}
              isFeedView={true}
            ></SongCard>
          </div>
        </>
      )}
    </div>
  );
}

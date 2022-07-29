import "./SongCard.css";
import SongHeaderView from "../SongHeaderView/SongHeaderView";

import SongHeader from "../SongHeader/SongHeader";
import logo from "../../logo.svg";

export default function SongCard({ profile, song, isFeedView }) {
  return (
    <div
      className={
        isFeedView ? "feedview-songcard-component" : "songcard-component"
      }
    >
      <div className="songheader-wrapper">
        <SongHeaderView song={song}></SongHeaderView>
      </div>
      <div
        className={
          isFeedView
            ? "feedview-album-picture-wrapper"
            : "album-picture-wrapper"
        }
      >
        {song.album && song.album.images && (
          <img src={song.album.images[0].url} alt="album picture"></img>
        )}
      </div>
    </div>
  );
}

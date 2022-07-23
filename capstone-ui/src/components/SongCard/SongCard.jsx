import "./SongCard.css";
import SongHeaderView from "../SongHeaderView/SongHeaderView";

import SongHeader from "../SongHeader/SongHeader";
import logo from "../../logo.svg";

export default function SongCard({ profile, token, song, isFeedView }) {
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
        {/* <iframe
          // style="border-radius:12px"
          className="song-playing-picture"
          src={`https://open.spotify.com/embed/track/${song.id}`}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe> */}
      </div>
    </div>
  );
}

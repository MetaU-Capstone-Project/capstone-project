import "./SongHeader.css";
import { Link } from "react-router-dom";

import logo from "../../logo.svg";

export default function SongHeader({ song }) {
  function getArtists(artists) {
    if (artists) {
      let result = "";
      for (let i = 0; i < artists.length; i++) {
        result += artists[i].name;
        result += ", ";
      }

      return result.substring(0, result.length - 2);
    }
    return "";
  }

  return (
    <Link to={`/post/${song.id}`} key={song.id} className="songheader-border">
      <div className="songheader-component">
        <div className="play-song-wrapper">
          <img src={song.album.images[0].url} alt="song-image"></img>
        </div>
        <div className="song-info-wrapper">
          <div className="song-info-row">
            <span className="song-info">{song.name}</span>
          </div>
          <div className="song-info-row">
            <span className="song-info">{getArtists(song.artists)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

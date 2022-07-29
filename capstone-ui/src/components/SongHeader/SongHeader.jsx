import "./SongHeader.css";
import { Link } from "react-router-dom";

/**
 * Component for displaying song player, name, and artists
 * @param {object} props Component props
 * @param {object} props.song Information about song from Spotify API
 */
export default function SongHeader({ song }) {
  /**
   * Formats song's artists as comma separated string
   * @param {Array<string>} artists array of song's artists
   */
  function getArtists(artists) {
    if (artists != undefined) {
      let result = "";
      for (let i = 0; i < artists.length; i++) {
        result += artists[i].name + ", ";
      }

      return result.substring(0, result.length - 2);
    }
    return "";
  }

  return (
    <Link to={`/post/${song.id}`} key={song.id} className="songheader-border">
      <div className="songheader-component-songheader">
        <div className="play-song-wrapper">
          <iframe
            className="songheader-playing-picture"
            src={`https://open.spotify.com/embed/track/${song.id}`}
            width="100%"
            height="380"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="song-info-wrapper-songheader">
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

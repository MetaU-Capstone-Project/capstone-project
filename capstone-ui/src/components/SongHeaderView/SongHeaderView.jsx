import "./SongHeaderView.css";

export default function SongHeaderView({ song }) {
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
    <div className="songheader-component">
      <div className="play-song-wrapper">
        <iframe
          className="songheader-playing-picture"
          src={`https://open.spotify.com/embed/track/${song.id}`}
          width="100%"
          height="380"
          frameBorder="0"
        ></iframe>
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
  );
}

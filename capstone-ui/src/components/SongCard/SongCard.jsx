import "./SongCard.css";
import SongHeaderView from "../SongHeaderView/SongHeaderView";

/**
 * Component for displaying song player, name, artists, and album picture
 * @param {object} props Component props
 * @param {object} props.song Information about song from Spotify API
 * @param {boolean} props.isFeedView Is true if component will be rendered in the home page feed
 */
export default function SongCard({ song, isFeedView }) {
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
        {song.album != undefined && song.album.images != undefined && (
          <img src={song.album.images[0].url} alt="album picture"></img>
        )}
      </div>
    </div>
  );
}

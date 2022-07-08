// import * as React from "react";
import "./SongHeaderView.css";
import { Link } from "react-router-dom";

// TODO - temporarily use logo as play song icon
import logo from "../../logo.svg";

export default function SongHeaderView({ song }) {
  function getArtists(artists) {
    let result = "";
    for (let i = 0; i < artists.length; i++) {
      result += artists[i].name;
      result += ", ";
    }

    return result.substring(0, result.length - 2);
  }

  return (
    <div className="songheader-component">
      <div className="play-song-wrapper">
        {/* TODO - play song icon */}
        {song.album &&
          song.album.images &&
          song.album.images.length > 0 &&
          song.album.images[0].url && (
            <img src={song.album.images[0].url} alt="song-image"></img>
          )}

        {/* 6/8/22 - kinda working */}
        {/* <img src={song.album.images[0].url} alt="song-image"></img> */}
      </div>
      <div className="song-info-wrapper">
        <div className="song-info-row">
          <span className="song-info">{song.name}</span>
        </div>
        <div className="song-info-row">
          {/* <span className="song-info">{getArtists(song.artists)}</span> */}
        </div>
      </div>
    </div>
  );
}

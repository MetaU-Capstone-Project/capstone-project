// import * as React from "react";
import "./SongHeader.css";

// TODO - temporarily use logo as play song icon
import logo from "../../logo.svg";

export default function SongHeader() {
  return (
    <div className="songheader-component">
      <div className="play-song-wrapper">
        {/* TODO - play song icon */}
        <img src={logo} alt="song-image"></img>
      </div>
      <div className="song-info-wrapper">
        <div className="song-info-row">
          <span className="song-info">Song name</span>
        </div>
        <div className="song-info-row">
          <span className="song-info">Music artist</span>
        </div>

        {/* TODO - stretch feature? how much of song has played */}
      </div>
    </div>
  );
}

// import * as React from "react";
import "./SongCard.css";
import SongHeaderView from "../SongHeaderView/SongHeaderView";

import SongHeader from "../SongHeader/SongHeader";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function SongCard({ profile, token, song }) {
  console.log("AHHHH");
  console.log(song);

  return (
    <div className="songcard-component">
      <div className="songheader-wrapper">
        {/* <SongHeader song={song}></SongHeader> */}

        {/* was working way before */}
        <SongHeaderView song={song}></SongHeaderView>
      </div>
      <div className="album-picture-wrapper">
        {/* <img src={logo} alt="album picture"></img> */}

        {song.album && song.album.images && (
          <img src={song.album.images[0].url} alt="album picture"></img>
        )}
        {/* <img src={song.album.images[0].url} alt="album picture"></img> */}
      </div>
    </div>
  );
}

// import * as React from "react";
import "./SongCard.css";

import SongHeader from "../SongHeader/SongHeader";
// TODO temporarily use logo as album picture
import logo from "../../logo.svg";

export default function SongCard() {
  return (
    <div className="songcard-component">
      <div className="songheader-wrapper">
        <SongHeader></SongHeader>
      </div>
      <div className="album-picture-wrapper">
        <img src={logo} alt="album picture"></img>
      </div>
    </div>
  );
}

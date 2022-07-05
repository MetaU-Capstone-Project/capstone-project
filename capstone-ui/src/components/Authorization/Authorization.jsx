// import * as React from "react";

import "./Authorization.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

// TODO - tie in with Spotify API authorization
export default function Authorization() {
  return (
    <div className="authorization-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Spotify Authorization</span>
        <input className="username-input" placeholder="Username"></input>
        <input className="password-input" placeholder="Password"></input>
        <div className="register-buttons">
          <button className="go-back-button">Go Back</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </div>
  );
}

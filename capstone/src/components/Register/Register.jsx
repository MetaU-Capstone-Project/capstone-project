// import * as React from "react";

import "./Register.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function Register() {
  return (
    <div className="register-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Register</span>
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

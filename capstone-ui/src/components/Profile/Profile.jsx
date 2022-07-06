import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

const Parse = require("parse");

export default function Profile() {
  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Login</span>
        <input className="username-input" placeholder="Username"></input>
        <input
          className="password-input"
          placeholder="Password"
          type="password"
        ></input>
        <button className="login-button">Login</button>
        <span className="register-question">Don't have an account?</span>
        <button className="register-from-login-button">
          <span>Register here!</span>
        </button>
      </div>
    </div>
  );
}

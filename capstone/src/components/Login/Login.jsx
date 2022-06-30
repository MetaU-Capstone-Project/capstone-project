// import * as React from "react";

import "./Login.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

export default function Login() {
  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Login</span>
        <input className="username-input" placeholder="Username"></input>
        <input className="password-input" placeholder="Password"></input>
        <button className="login-button">Login</button>
        <span className="register-question">Don't have an account?</span>
        <button className="register-from-login-button">
          <span>Register here!</span>
        </button>
      </div>
    </div>
  );
}

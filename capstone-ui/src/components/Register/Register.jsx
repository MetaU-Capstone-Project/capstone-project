// import * as React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

const Parse = require("parse");

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
      alert(
        `Success! User ${createdUser.getUsername()} was successfully created!`
      );
      return true;
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      alert(`Error! ${error}`);
      return false;
    }
  };

  return (
    <div className="register-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Register</span>
        <input
          className="username-input"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        ></input>
        <input
          className="password-input"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        ></input>
        <div className="register-buttons">
          <Link to={"/"}>
            <button className="go-back-button">Go Back</button>
          </Link>
          {/* <Link to={"/"}> */}
          <button className="register-button" onClick={() => registerUser()}>
            Register
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

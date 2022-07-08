// import * as React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";

// added
import { loginURL } from "../../spotify";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

const Parse = require("parse");

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";

export default function Register(
  {
    // username,
    // password,
    // currentUser,
    // setUsername,
    // setPassword,
    // setCurrentUser,
  }
) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async function () {
    const usernameValue = username;
    const passwordValue = password;

    let postRequest = {
      username: usernameValue,
      password: passwordValue,
    };
    axios
      .post("http://localhost:3001/user/register", postRequest)
      .then(function (response) {
        alert(
          `Success! User ${response.data.username} was successfully created!`
        );

        // TODO login user after registration
        // getCurrentUser();
        // before
        // window.location.href = "http://localhost:3000/feed";
        window.location.href = "http://localhost:3001/user/authorize";
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        setUsername("");
        setPassword("");
        return false;
      });
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
          {/* originally working!!! */}
          {/* <a href={loginURL} className="register-button"> */}
          {/* <button className="register-button" onClick={() => registerUser()}> */}
          {/* Register */}
          {/* </button> */}
          {/* </a> */}

          {/* this was working 6/8/22 */}
          {/* <a
            href={`http://localhost:3001/user/authorize`}
            className="register-button"
          > */}
          <button className="register-button" onClick={() => registerUser()}>
            Register
          </button>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Settings from "../Settings/Settings";
import logo from "../../logo.svg";

const Parse = require("parse");

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";

export default function Register({ spotifyProfile }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spotifyUsername, setSpotifyUsername] = useState("");

  const registerUser = async function () {
    const usernameValue = username;
    const passwordValue = password;
    const emailValue = spotifyProfile.email;
    const spotifyURLValue = spotifyProfile.external_urls.spotify;
    const imageURLValue =
      spotifyProfile.images && spotifyProfile.images.length > 0
        ? spotifyProfile.images[0].url
        : "logo";

    let postRequest = {
      username: usernameValue,
      password: passwordValue,
      email: emailValue,
      spotifyURL: spotifyURLValue,
      imageURL: imageURLValue,
    };
    axios
      .post("http://localhost:3001/user/register", postRequest)
      .then(function (response) {
        alert(
          `Success! User ${response.data.username} was successfully created!`
        );
        window.location.href = `http://localhost:3000/preferences/${usernameValue}`;
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        setUsername("");
        setPassword("");
        setSpotifyUsername("");
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
        <input
          className="username-input"
          value={spotifyProfile.email}
          readOnly
        ></input>
        <div className="register-buttons">
          <Link to={"/"}>
            <button className="go-back-button">Go Back</button>
          </Link>
          <button className="register-button" onClick={() => registerUser()}>
            Register
          </button>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";
import axios from "axios";

const Parse = require("parse");

export default function Login({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async function () {
    axios.get("http://localhost:3001/user").then(function (response) {
      setCurrentUser(response.data);
      return response.data;
    });
  };

  const logUserIn = async function () {
    const usernameValue = username;
    const passwordValue = password;

    let postRequest = {
      username: usernameValue,
      password: passwordValue,
    };
    axios
      .post("http://localhost:3001/user/login", postRequest)
      .then(function (response) {
        alert(
          `Success! User ${response.data.username} has successfully signed in!`
        );
        setUsername(response.data.username);
        setPassword(response.data.password);
        getCurrentUser();

        // TODO remove comment
        window.location.href = "http://localhost:3001/user/authorize";
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        // uncomment out
        // setUsername("");
        // setPassword("");
        return false;
      });
  };

  // TODO - move to profile navbar icon, pass states to navbar
  // const logUserOut = async function () {
  //   try {
  //     await Parse.User.logOut();
  //     // To verify that current user is now empty, currentAsync can be used
  //     const currentUser = await Parse.User.current();
  //     if (currentUser === null) {
  //       alert("Success! No user is logged in anymore!");
  //     }
  //     // Update state variable holding current user
  //     getCurrentUser();
  //     return true;
  //   } catch (error) {
  //     alert(`Error! ${error.message}`);
  //     return false;
  //   }
  // };

  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Login</span>
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
        <button className="login-button" onClick={() => logUserIn()}>
          Login
        </button>
        <span className="register-question">Don't have an account?</span>
        <Link to={"/register"}>
          <button className="register-from-login-button">
            <span>Register here!</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

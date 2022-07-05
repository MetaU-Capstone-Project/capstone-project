import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

// TODO - temporarily use logo as profile picture
import logo from "../../logo.svg";

const Parse = require("parse");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  const logUserIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      // Clear input fields
      setUsername("");
      setPassword("");
      return false;
    }
  };

  // TODO - move to profile navbar icon, pass states to navbar
  // const logUserOut = async function () {
  //   try {
  //     await Parse.User.logOut();
  //     // To verify that current user is now empty, currentAsync can be used
  //     const currentUser = await Parse.User.current();
  //     if (currentUser === null) {
  //       alert('Success! No user is logged in anymore!');
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

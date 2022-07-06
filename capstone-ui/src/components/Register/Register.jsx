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

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const registerUser = async function () {
  //   // Note that these values come from state variables that we've declared before
  //   const usernameValue = username;
  //   const passwordValue = password;
  //   try {
  //     // Since the signUp method returns a Promise, we need to call it using await
  //     const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
  //     alert(
  //       `Success! User ${createdUser.getUsername()} was successfully created!`
  //     );
  //     return true;
  //   } catch (error) {
  //     // signUp can fail if any parameter is blank or failed an uniqueness check on the server
  //     alert(`Error! ${error}`);
  //     return false;
  //   }
  // };

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
        console.log("app.jsx");
        console.log(response.data);

        alert(
          `Success! User ${response.data.username} was successfully created!`
        );

        // TODO login user after registration
        // getCurrentUser();
        window.location.href = "http://localhost:3000/feed";
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        setUsername("");
        setPassword("");
        return false;
      });

    // // Note that these values come from state variables that we've declared before
    // const usernameValue = username;
    // const passwordValue = password;
    // try {
    //   // Since the signUp method returns a Promise, we need to call it using await
    //   const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
    //   alert(
    //     `Success! User ${createdUser.getUsername()} was successfully created!`
    //   );
    //   return true;
    // } catch (error) {
    //   // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    //   alert(`Error! ${error}`);
    //   return false;
    // }
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
          {/* <Link to={"/home"}>
            <button className="register-button" onClick={() => registerUser()}>
              Register
            </button>
          </Link> */}

          <a href={loginURL} className="register-button">
            {/* <button className="register-button" onClick={() => registerUser()}> */}
            Register
            {/* </button> */}
          </a>
        </div>
      </div>
    </div>
  );
}

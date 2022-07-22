import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./RegistrationPreferences.css";
import axios from "axios";
import Settings from "../Settings/Settings";
import logo from "../../logo.svg";
import Recommendations from "../Recommendations/Recommendations";

const Parse = require("parse");

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";

export default function RegistrationPreferences({}) {
  let { username } = useParams();

  const [isRecommendView, setIsRecommendView] = useState(false);

  function showRecommendedUsers() {
    setIsRecommendView(true);
  }

  function handleNext() {
    window.location.href = "http://localhost:3000/main";
  }

  return (
    <div className="register-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <Settings username={username} isRegisterView={true}></Settings>
      </div>
    </div>
  );
}

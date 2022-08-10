import { useEffect } from "react";
import { deleteTokens } from "../../spotify";
import "./Authorization.css";
import logo from "../../logo.png";

export default function Authorization() {
  function handleLogin() {
    window.location.href = "http://localhost:3001/user/authorize";
  }

  useEffect(() => {
    deleteTokens();
  }, []);

  return (
    <div className="authorization-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Get Rec'ed!</span>
        <span className="welcome-text">
          {"a platform for music lovers to share song recomendations :)"}
        </span>
        <button onClick={handleLogin}>Spotify Login</button>
      </div>
    </div>
  );
}

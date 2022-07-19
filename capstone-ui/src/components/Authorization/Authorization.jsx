import { useEffect } from "react";
import { deleteTokens } from "../../spotify";
import "./Authorization.css";
import logo from "../../logo.svg";

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
        <span className="instruction">Spotify Authorization</span>
        <button onClick={handleLogin}>Welcome</button>
      </div>
    </div>
  );
}

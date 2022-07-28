import { useEffect } from "react";
import "./Error.css";
import logo from "../../logo.svg";

export default function Error() {
  function handleBackToAuthorization() {
    window.location.href = "http://localhost:3000";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Error authorizing.");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="error-page">
      <div className="logo-wrapper">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="submission-wrapper">
        <span className="instruction">Error</span>
        <button className="error-button" onClick={handleBackToAuthorization}>
          Back
        </button>
      </div>
    </div>
  );
}

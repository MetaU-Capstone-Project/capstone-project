import Home from "../Home/Home";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Authorization from "../Authorization/Authorization";
import Main from "../Main/Main";
import RegistrationPreferences from "../RegistrationPreferences/RegistrationPreferences";
import Error from "../Error/Error";

import "./App.css";

const Parse = require("parse");
const PARSE_APPLICATION_ID = "tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [userExists, setUserExists] = useState(null);
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [appProfile, setAppProfile] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/authorization" />}
          />
          <Route exact path="/error" element={<Error />} />
          <Route
            exact
            path="/authorization"
            element={<Authorization></Authorization>}
          />
          <Route
            exact
            path="/main"
            element={
              <Main
                userExists={userExists}
                setUserExists={setUserExists}
                spotifyProfile={spotifyProfile}
                setSpotifyProfile={setSpotifyProfile}
                username={username}
                setUsername={setUsername}
                appProfile={appProfile}
                setAppProfile={setAppProfile}
                token={token}
                setToken={setToken}
              ></Main>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Home
                page={"home"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/search"
            element={
              <Home
                page={"search"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/groups"
            element={
              <Home
                page={"groups"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/friendprofile/:username"
            element={
              <Home
                page={"friendprofile"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Home
                page={"profile"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/post/:songId"
            element={
              <Home
                page={"post"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
          <Route
            exact
            path="/preferences/:username"
            element={
              <RegistrationPreferences
                username={username}
              ></RegistrationPreferences>
            }
          />
          <Route
            exact
            path="/group/:name"
            element={
              <Home
                page={"group"}
                username={username}
                profile={spotifyProfile}
                token={token}
              ></Home>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Home from "../Home/Home";
import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Authorization from "../Authorization/Authorization";
import Main from "../Main/Main";
import RegistrationPreferences from "../RegistrationPreferences/RegistrationPreferences";
import Error from "../Error/Error";
import "./App.css";

function App() {
  const [userExists, setUserExists] = useState(null);
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [username, setUsername] = useState(null);

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
              ></Home>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

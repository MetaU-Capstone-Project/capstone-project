import logo from '../../logo.svg';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import React, {useState, useEffect} from 'react';
import Preferences from '../Preferences/Preferences';

import { accessToken, getCurrentUserProfile, logout } from '../../spotify';
import { catchErrors } from '../../utils';

import axios from "axios";

import './App.css';

// Parse

import { Routes, Route, BrowserRouter } from "react-router-dom";

// Parse initialization
const Parse = require('parse');
const PARSE_APPLICATION_ID = 'tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [view, setView] = React.useState("");

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  // need app username for post requests
  const [username, setUsername] = useState("");
    // TODO delete this
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchSpotifyUser = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchSpotifyUser());

    // const fetchAppUser = async () => {
    //   const { data } = await axios.get("http://localhost:3001/user");
    //   setUsername(data.username);
    // }

    // catchErrors(fetchAppUser());

    // console.log(username);
  }, []);

  useEffect(() => {
    const fetchAppUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      setUsername(data.username);
    }

    catchErrors(fetchAppUser());
  }, [username])


  // TODO initial 401 error 

  return (
    <div className="App">
      {/* temporarily commented out */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login view={view} setView={setView} username={username} password={password} currentUser={currentUser} setUsername={setUsername} setPassword={setPassword} setCurrentUser={setCurrentUser}></Login>}
          />
          <Route exact path="/register" element={<Register username={username} password={password} currentUser={currentUser} setUsername={setUsername} setPassword={setPassword} setCurrentUser={setCurrentUser}></Register>}
          />
          <Route exact path="/feed" element={<Home page={'feed'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/search" element={<Home page={'search'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/groups" element={<Home page={'groups'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/profile" element={<Home page={'profile'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/post/:songId" element={<Home page={'post'} username={username} profile={profile} token={token}></Home>}
          />
          {/* <Route exact path="/timeline" element={<Home page={'timeline'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/preferences" element={<Home page={'preferences'} username={username} profile={profile} token={token}></Home>}
          />
          <Route exact path="/followers" element={<Home page={'followers'} username={username} profile={profile} token={token}></Home>}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
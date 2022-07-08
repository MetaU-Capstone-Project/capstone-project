import logo from '../../logo.svg';
import SongCard from '../SongCard/SongCard';
import SongHeader from '../SongHeader/SongHeader';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import PostHeader from '../PostHeader/PostHeader';
import PostCard from '../PostCard/PostCard';
import Search from '../Search/Search';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Authorization from '../Authorization/Authorization';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import ProfileCard from '../ProfileCard/ProfileCard';
import React, {useState, useEffect} from 'react';

import { accessToken, getCurrentUserProfile, logout } from '../../spotify';
import { catchErrors } from '../../utils';

import axios from "axios";

import './App.css';

// Parse
import PostComponent from "../../api/PostComponent";

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

  // TODO login stuff
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // was working 
  useEffect(() => {
    console.log('username in app');
    console.log(username);
    setToken(accessToken);

    // uncommented out
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);

  // TODO initial 401 error 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login view={view} setView={setView} username={username} password={password} currentUser={currentUser} setUsername={setUsername} setPassword={setPassword} setCurrentUser={setCurrentUser}></Login>}
          />
          <Route exact path="/register" element={<Register></Register>}
          />
          <Route exact path="/feed" element={<Home page={'feed'} profile={profile} token={token}></Home>}
          />
          <Route exact path="/search" element={<Home page={'search'} profile={profile} token={token}></Home>}
          />
          <Route exact path="/groups" element={<Home page={'groups'} profile={profile} token={token}></Home>}
          />
          <Route exact path="/profile" element={<Home page={'profile'} profile={profile} token={token}></Home>}
          />
          <Route exact path="/post/:songId" element={<Home page={'post'} profile={profile} token={token}></Home>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
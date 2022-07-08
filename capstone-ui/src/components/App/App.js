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

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  // TODO initial 401 error 

  // TODO pass in profile

  return (
    <div className="App">
      {/* TODO was working - merge with new code */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login view={view} setView={setView}></Login>}
          />
          <Route exact path="/register" element={<Register></Register>}
          />
          <Route exact path="/feed" element={<Home page={'feed'}></Home>}
          />
          <Route exact path="/search" element={<Home page={'search'} token={token}></Home>}
          />
          <Route exact path="/groups" element={<Home page={'groups'}></Home>}
          />
          <Route exact path="/profile" element={<Home page={'profile'} profile={profile}></Home>}
          />
          <Route exact path="/post" element={<Home page={'post'} profile={profile}></Home>}
          />
        </Routes>
      </BrowserRouter>
      {/* {!token ? (
        <a className="App-link" href="http://localhost:3001/user/authorize">
          Log in to Spotify
        </a>
      ) : (
        <>
          <button onClick={logout}>Log Out</button>

          {profile && (
            <div>
              <h1>{profile.display_name}</h1>
              <p>{profile.followers.total} Followers</p>
              {profile.images.length && profile.images[0].url && (
                <img src={profile.images[0].url} alt="Avatar"/>
              )}
            </div>
          )}
        </>
      )} */}
    </div>
  );
}

export default App;
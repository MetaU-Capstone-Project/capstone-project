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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login></Login>}
          />
          <Route exact path="/register" element={<Register></Register>}
          />
          <Route exact path="/feed" element={<Home page={'feed'}></Home>}
          />
          <Route exact path="/search" element={<Home page={'search'}></Home>}
          />
          <Route exact path="/groups" element={<Home page={'groups'}></Home>}
          />
          <Route exact path="/profile" element={<Home page={'profile'}></Home>}
          />
        </Routes>
      </BrowserRouter>

      {/* <span>SongHeader</span>
      <SongHeader></SongHeader> */}

      {/* <span>SongCard</span>
      <SongCard></SongCard> */}

      {/* <span>ProfileHeader</span>
      <ProfileHeader></ProfileHeader> */}

      {/* <span>PostHeader</span>
      <PostHeader></PostHeader> */}

      {/* <span>PostCard</span>
      <PostCard></PostCard> */}

      {/* <span>Search Bar</span>
      <SearchBar></SearchBar> */}

      {/* <span>Search</span>
      <Search></Search> */}

      {/* <span>Search Results</span>
      <SearchResults></SearchResults> */}

      {/* <span>Login</span>
      <Login></Login> */}

      {/* <span>Register</span>
      <Register></Register> */}

      {/* <span>Authorization</span>
      <Authorization></Authorization> */}

      {/* <span>Home</span> */}
      {/* <Home></Home> */}

      {/* Parse */}
      {/* <PostComponent></PostComponent> */}

      {/* 6/5/22 */}
      {/* <Register></Register> */}

      {/* <Profile></Profile> */}

      {/* <ProfileCard></ProfileCard> */}

      {/* <Profile></Profile> */}
    </div>
  );
}

export default App;

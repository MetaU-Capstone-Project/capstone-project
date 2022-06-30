import logo from '../../logo.svg';
import SongCard from '../SongCard/SongCard';
import SongHeader from '../SongHeader/SongHeader';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import PostHeader from '../PostHeader/PostHeader';
import PostCard from '../PostCard/PostCard';
import Search from '../Search/Search';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

import './App.css';

// starter code
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
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

      <span>Search Results</span>
      <SearchResults></SearchResults>
    </div>
  );
}

export default App;

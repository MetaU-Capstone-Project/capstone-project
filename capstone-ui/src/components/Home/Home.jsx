// import * as React from "react";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Feed from "../Feed/Feed";
import Groups from "../Groups/Groups";
import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Preferences from "../Preferences/Preferences";
import axios from "axios";
import { catchErrors } from "../../utils";

import "./Home.css";

// TODO props = {page}
// export default function Home({ username, page, token, profile }) {
//   return (
//     <div className="home-page">
//       <Navbar></Navbar>
//       {page === "home" && (
//         <Feed username={username} profile={profile} token={token}></Feed>
//       )}
//       {page === "search" && (
//         <Search username={username} profile={profile} token={token}></Search>
//       )}
//       {page === "groups" && (
//         <Groups username={username} profile={profile} token={token}></Groups>
//       )}
//       {page === "profile" && (
//         <Profile
//           username={username}
//           profile={profile}
//           token={token}
//           followers={false}
//           timeline={true}
//           settings={false}
//         ></Profile>
//       )}
//       {page === "post" && (
//         <Post username={username} token={token} profile={profile}></Post>
//       )}
//       {page === "timeline" && (
//         <Profile
//           username={username}
//           profile={profile}
//           token={token}
//           followers={false}
//           timeline={true}
//           settings={false}
//         ></Profile>
//       )}
//       {page === "preferences" && (
//         <Profile
//           username={username}
//           profile={profile}
//           token={token}
//           followers={false}
//           timeline={false}
//           settings={true}
//         ></Profile>
//       )}
//       {page === "followers" && (
//         <Profile
//           username={username}
//           profile={profile}
//           token={token}
//           followers={true}
//           timeline={false}
//           settings={false}
//         ></Profile>
//       )}
//     </div>
//   );

export default function Home({ page, token, profile }) {
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    const fetchAppUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      setUsername(data.username);
    };

    catchErrors(fetchAppUser());
    console.log("fetching username: " + username);
  }, []);

  return (
    <div className="home-page">
      <Navbar></Navbar>
      {page === "home" && (
        <Feed username={username} profile={profile} token={token}></Feed>
      )}
      {page === "search" && (
        <Search username={username} profile={profile} token={token}></Search>
      )}
      {page === "groups" && (
        <Groups username={username} profile={profile} token={token}></Groups>
      )}
      {page === "profile" && (
        <Profile
          username={username}
          profile={profile}
          token={token}
          followers={false}
          timeline={true}
          settings={false}
        ></Profile>
      )}
      {page === "post" && (
        <Post username={username} token={token} profile={profile}></Post>
      )}
      {page === "timeline" && (
        <Profile
          username={username}
          profile={profile}
          token={token}
          followers={false}
          timeline={true}
          settings={false}
        ></Profile>
      )}
      {page === "preferences" && (
        <Profile
          username={username}
          profile={profile}
          token={token}
          followers={false}
          timeline={false}
          settings={true}
        ></Profile>
      )}
      {page === "followers" && (
        <Profile
          username={username}
          profile={profile}
          token={token}
          followers={true}
          timeline={false}
          settings={false}
        ></Profile>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "./Main.css";
import axios from "axios";
import { accessToken, getCurrentUserProfile, logout } from "../../spotify";
import { catchErrors } from "../../utils";
import Home from "../Home/Home";
import { serverAuthToken } from "parse";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Register from "../Register/Register";

export default function Main({
  userExists,
  setUserExists,
  spotifyProfile,
  setSpotifyProfile,
  username,
  setUsername,
  appProfile,
  setAppProfile,
  token,
  setToken,
}) {
  const [isFetching, setIsFetching] = useState(false);

  // was working for login
  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const { data } = await getCurrentUserProfile();
      setSpotifyProfile(data);

      let email = data.email;
      const response = await axios.get(
        `http://localhost:3001/user/exists/${email}`
      );
      setUserExists(response.data);

      if (response.data) {
        const result = await axios.get(
          `http://localhost:3001/user/profileByEmail/${email}`
        );
        setAppProfile(result.data);
        setUsername(result.data.username);
        setToken(accessToken);

        const passwordData = await axios.get(
          `http://localhost:3001/user/password/${result.data.username}`
        );
        const password = passwordData.data;

        let postRequest = {
          username: result.data.username,
          password: password,
        };
        axios
          .post("http://localhost:3001/user/login", postRequest)
          .then(function (response) {});
      }
      // added
      setIsFetching(false);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {!isFetching ? (
        <>
          {userExists === false && (
            <Register spotifyProfile={spotifyProfile}></Register>
          )}
          {username && (
            <Home
              page={"home"}
              username={username}
              profile={spotifyProfile}
              token={token}
              appProfile={appProfile}
            ></Home>
          )}
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
}

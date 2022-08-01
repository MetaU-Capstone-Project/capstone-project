import React, { useState } from "react";
import "./Main.css";
import axios from "axios";
import { getCurrentUserProfile } from "../../spotify";
import { catchErrors } from "../../utils";
import Home from "../Home/Home";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Register from "../Register/Register";

/**
 * Page to direct user to home page after logging in if they have an account, or to registration page if they don't
 * @param {object} props Component props
 * @param {boolean} props.userExists True if the Spotify account that user has logged in with is linked to an app profile
 * @param {Function} props.setUserExists Handler to set if Spotify account that user is logged into is linked to an app profile
 * @param {object} props.spotifyProfile Information about the Spotify account that is logged into after authentication
 * @param {Function} props.setSpotifyProfile Handler to save the information about the Spotify account that is logged into after authentication
 * @param {string} username of user trying to log in
 * @param {Function} props.setUsername Handler to save username of user trying to log in
 */
export default function Main({
  userExists,
  setUserExists,
  spotifyProfile,
  setSpotifyProfile,
  username,
  setUsername,
}) {
  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      // Retrieves Spotify profile information based on Spotify account logged in
      const spotifyProfileResponse = await getCurrentUserProfile();
      setSpotifyProfile(spotifyProfileResponse.data);

      // Check if email associated with Spotify account is registered to an app account
      const userExistsResponse = await axios.get(
        `http://localhost:3001/user/exists/${spotifyProfileResponse.data.email}`
      );
      setUserExists(userExistsResponse.data);

      if (userExistsResponse.data) {
        const appProfileResponse = await axios.get(
          `http://localhost:3001/user/profileByEmail/${spotifyProfileResponse.data.email}`
        );
        setUsername(appProfileResponse.data.username);

        // Logs user into account
        axios.post("http://localhost:3001/user/login", {
          username: appProfileResponse.data.username,
          password: (
            await axios.get(
              `http://localhost:3001/user/password/${appProfileResponse.data.username}`
            )
          ).data,
        });
      }
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
          {username != null && (
            <Home
              page={"home"}
              username={username}
              profile={spotifyProfile}
            ></Home>
          )}
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
}

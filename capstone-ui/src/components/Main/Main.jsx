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
      // added ^
      const { data } = await getCurrentUserProfile();
      setSpotifyProfile(data);
      console.log("dataaaa");
      console.log(data);

      // TODO fix display name what if premium account so needs to use other name or identifier?
      //   let spotifyUsername = data.display_name;

      let email = data.email;

      //   const response = await axios.get(
      //     `http://localhost:3001/user/exists/${spotifyUsername}`
      //   );
      const response = await axios.get(
        `http://localhost:3001/user/exists/${email}`
      );
      setUserExists(response.data);

      console.log("user exists");
      console.log(response.data);

      if (response.data) {
        // const result = await axios.get(
        //   `http://localhost:3001/user/profileBySpotifyUsername/${spotifyUsername}`
        // );
        const result = await axios.get(
          `http://localhost:3001/user/profileByEmail/${email}`
        );
        setAppProfile(result.data);
        setUsername(result.data.username);
        setToken(accessToken);
        console.log("blah" + result.data.username);

        const passwordData = await axios.get(
          `http://localhost:3001/user/password/${result.data.username}`
        );
        const password = passwordData.data;
        console.log("password: " + password);
        // TODO
        // localStorage.setItem("username", result.data.username);
        // localStorage.setItem("user", JSON.stringify(result.data));
        // // added
        // // TODO - call login
        // // const login = await axios.get
        let postRequest = {
          username: result.data.username,
          password: password,
        };
        axios
          .post("http://localhost:3001/user/login", postRequest)
          .then(function (response) {
            // alert(
            //   `Success! User ${response.data.username} has successfully signed in!`
            // );
            console.log("successfully logged in!!!!");
            // setUsername(response.data.username);
            // setPassword(response.data.password);
            // getCurrentUser();

            // window.location.href = "http://localhost:3001/user/authorize";
          });
        //   .catch((error) => {
        //     // alert(`Error! ${error.message}`);
        //     // uncomment out
        //     // setUsername("");
        //     // setPassword("");
        //     // return false;
        //     console.log("error logging in");
        //   });
        // // added
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
          {userExists === false && <Register></Register>}
          {username && (
            <Home
              page={"home"}
              username={username}
              profile={spotifyProfile}
              token={token}
            ></Home>
          )}
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
}

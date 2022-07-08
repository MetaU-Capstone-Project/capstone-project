// import * as React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard/PostCard";

import "./Post.css";
import { catchErrors } from "../../utils";

export default function Post({ username, profile, token }) {
  let { songId } = useParams();
  const [songInfo, setSongInfo] = useState({});

  React.useEffect(() => {
    console.log("hiewfawef");
    async function getTrack() {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hello");
      console.log(response.data);
      setSongInfo(response.data);
    }

    getTrack();
  }, [songId]);

  // TODO
  const addPost = async function () {
    console.log(username);
    console.log("add post");

    let postRequest = {
      username: username,
      trackId: songId,
    };
    axios
      .post("http://localhost:3001/user/post", postRequest)
      .then(function (response) {
        alert(`Success! Post was successfully created!`);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        return false;
      });
  };

  return (
    <div className="post-page" key="post-page">
      <div className="postcard-wrapper">
        <PostCard profile={profile} token={token} song={songInfo}></PostCard>
      </div>
      <div className="post-button-wrapper">
        <button className="post-button" onClick={addPost}>
          Post
        </button>
      </div>
    </div>
  );
}

// import * as React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard/PostCard";

import "./Post.css";
import { catchErrors } from "../../utils";

export default function Post({ token }) {
  let { songId } = useParams();
  console.log("songId: " + songId);

  const [songInfo, setSongInfo] = useState({});

  const getTrack = async () => {
    console.log("token: " + token);

    const { data } = await axios
      .get(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("song info");
    console.log(data);
    setSongInfo(data);
  };

  useEffect(() => {
    console.log("use effect");
    catchErrors(getTrack());
  });

  return (
    <div className="post-page">
      <PostCard song={songInfo}></PostCard>
    </div>
  );
}

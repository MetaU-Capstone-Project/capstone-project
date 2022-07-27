import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import "./Post.css";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Select from "react-select";

export default function Post({ username, profile, token }) {
  let { songId } = useParams();
  const [songInfo, setSongInfo] = useState(null);
  const [selectedPostAudience, setSelectedPostAudience] = useState(null);
  const [postAudienceOptions, setPostAudienceOptions] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSongInfo(response.data);

      const postAudienceResponse = await axios.get(
        `http://localhost:3001/user/groups/${username}`
      );

      let audienceOptions = ["My Feed"];
      audienceOptions = audienceOptions.concat(
        postAudienceResponse.data.map((group) => group.groupName)
      );
      audienceOptions = audienceOptions.map((groupName) => {
        return { value: groupName, label: groupName };
      });

      setPostAudienceOptions(audienceOptions);
    };

    catchErrors(fetchData());
  }, []);

  const addPostToPersonal = async function () {
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

  const addPostToGroup = async function (groupName) {
    let postRequest = {
      username: username,
      trackId: songId,
      groupName: groupName,
    };
    axios
      .post("http://localhost:3001/user/grouppost", postRequest)
      .then(function (response) {
        alert(`Success! Post was successfully created to ${groupName}`);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        return false;
      });
  };

  const addPostToAudience = async function () {
    if (selectedPostAudience === null) {
      alert("You have not selected a feed to post to.");
    } else {
      if (selectedPostAudience.value === "My Feed") {
        addPostToPersonal();
      } else {
        addPostToGroup(selectedPostAudience.value);
      }
    }
  };

  function handlePostAudienceChange(e) {
    setSelectedPostAudience(e);
  }

  return (
    <div className="post-page" key="post-page">
      {songInfo ? (
        <div className="loading-wrapper">
          <div className="postcard-wrapper">
            <PostCard
              username={username}
              profile={profile}
              token={token}
              song={songInfo}
            ></PostCard>
          </div>
          <div className="post-button-wrapper">
            <Select
              className="post-select"
              closeMenuOnSelect={false}
              value={selectedPostAudience}
              options={postAudienceOptions}
              onChange={handlePostAudienceChange}
            />
            <button className="post-button" onClick={addPostToAudience}>
              Post
            </button>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

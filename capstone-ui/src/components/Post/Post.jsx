import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import "./Post.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { accessToken } from "../../spotify";
import Select from "react-select";
import { catchErrors } from "../../utils";

export default function Post({ username, profile }) {
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
            Authorization: `Bearer ${accessToken}`,
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

  // Add post to user's personal timeline
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

  // Add post to specified group feed
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

  // Handle adding post to backend based on user's selected audience preference
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

  function handlePostAudienceChange(audience) {
    setSelectedPostAudience(audience);
  }

  return (
    <div className="post-page" key="post-page">
      {songInfo ? (
        <div className="loading-wrapper">
          <div className="postcard-wrapper">
            <PostCard
              username={username}
              profile={profile}
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

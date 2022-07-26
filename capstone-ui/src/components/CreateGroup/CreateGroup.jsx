import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./CreateGroup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout, getGenres } from "../../spotify";
import { formatDate } from "../../utils";
import Switch from "react-switch";
import Select from "react-select";
import { catchErrors } from "../../utils";

import logo from "../../logo.svg";

export default function CreateGroup({
  username,
  token,
  profile,
  appProfile,
  isPreferencesView,
  tab,
  setTab,
  isFriendProfileView,
}) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [genreOptions, setGenreOptions] = useState(null);
  const [memberOptions, setMemberOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((element) => {
        return { value: element, label: element };
      });
      setGenreOptions(genreResults);

      const memberResponse = await axios.get(
        `http://localhost:3001/user/followers/${username}`
      );

      let memberResults = memberResponse.data.map((element) => {
        return { value: element, label: element };
      });
      setMemberOptions(memberResults);
    };

    catchErrors(fetchData());
  }, []);

  function createGroup() {
    let postRequest = {
      username: username,
      groupName: groupName,
      description: description,
      isPrivate: isPrivate,
      genres: selectedGenres,
      isAdmin: isPrivate,
    };
    axios
      .post("http://localhost:3001/user/group", postRequest)
      .then(function (response) {
        alert(`Success! Group ${groupName} was successfully created!`);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        return false;
      });

    setGroupName("");
    setDescription("");
    setIsPrivate(false);
    setSelectedGenres([]);

    for (let i = 0; i < selectedMembers.length; i++) {
      let inviteRequest = {
        username: selectedMembers[i].value,
        groupName: groupName,
      };
      axios.post("http://localhost:3001/user/invite", inviteRequest).then();
    }

    setSelectedMembers([]);
  }

  function handleSwitch(privacySetting) {
    setIsPrivate(privacySetting);
  }

  async function handleGenreChange(genres) {
    setSelectedGenres(genres);
  }

  async function handleMemberChange(members) {
    setSelectedMembers(members);
  }

  return (
    <div className="groupcard-component">
      <span className="instruction">Create a Group</span>
      <div className="group-info-wrapper">
        <span>Group Name</span>
        <input
          className="name-input"
          placeholder="Name"
          onChange={(event) => setGroupName(event.target.value)}
          value={groupName}
        ></input>
      </div>
      <div className="group-info-wrapper">
        <span>Group Description</span>
        <textarea
          className="description-input"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          placeholder="Description"
        ></textarea>
      </div>
      <div className="group-info-wrapper">
        <span>Privacy</span>
        <label className="group-privacy-label">
          <span className="group-privacy-text">
            {isPrivate ? "Private" : "Public"}
          </span>
          <Switch
            className="group-privacy-switch"
            onChange={handleSwitch}
            checked={isPrivate}
          />
        </label>
      </div>
      <div className="group-select-wrapper">
        <span className="group-preferences">Preferences</span>
        <div className="group-preference">
          <span>Genres</span>
          <Select
            className="preference-select"
            closeMenuOnSelect={false}
            value={selectedGenres}
            isMulti
            options={genreOptions}
            onChange={handleGenreChange}
          />
        </div>
      </div>
      <div className="group-members-wrapper">
        <span className="group-members-text">Members</span>
        <Select
          className="preference-select"
          closeMenuOnSelect={false}
          value={selectedMembers}
          isMulti
          options={memberOptions}
          onChange={handleMemberChange}
        />
      </div>
      <div className="group-create-button-wrapper">
        <button className="group-button" onClick={createGroup}>
          Create
        </button>
      </div>
    </div>
  );
}

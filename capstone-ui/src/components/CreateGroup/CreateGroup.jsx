import React, { useState } from "react";
import "./CreateGroup.css";
import axios from "axios";
import { getGenres } from "../../spotify";
import Switch from "react-switch";
import Select from "react-select";
import { catchErrors } from "../../utils";

/**
 * Component to create a new group
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {Function} props.setShouldUpdateGroupPage Handler for triggering rerendering of group page after user changes membership status (joins/leaves)
 */
export default function CreateGroup({ username, setShouldUpdateGroupPage }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [genreOptions, setGenreOptions] = useState(null);
  const [memberOptions, setMemberOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      // Populates the genre options for the genre preference dropdown button
      setGenreOptions(
        (await getGenres()).data.genres.map((genre) => {
          return { value: genre, label: genre };
        })
      );

      // Populates the member options for the invite dropdown button with the user's friends
      setMemberOptions(
        (
          await axios.get(`http://localhost:3001/user/followers/${username}`)
        ).data.map((member) => {
          return { value: member, label: member };
        })
      );
    };

    catchErrors(fetchData());
  }, []);

  function createGroup() {
    axios
      .post("http://localhost:3001/user/group", {
        username: username,
        groupName: groupName,
        description: description,
        isPrivate: isPrivate,
        genres: selectedGenres,
        isAdmin: isPrivate,
      })
      .then(function (response) {
        alert(`Group ${groupName} was successfully created!`);
      })
      .catch((error) => {
        alert(`${error.response.data.errorMessage}`);
      });

    setGroupName("");
    setDescription("");
    setIsPrivate(false);
    setSelectedGenres([]);

    for (let i = 0; i < selectedMembers.length; i++) {
      axios.post("http://localhost:3001/user/invite", {
        username: selectedMembers[i].value,
        groupName: groupName,
      });
    }

    setSelectedMembers([]);
    setShouldUpdateGroupPage(true);
  }

  // Toggles the group privacy settings between private and public
  function handleSwitch(privacySetting) {
    setIsPrivate(privacySetting);
  }

  // Sets the selected genres to reflect the selections user makes in genre dropdown button
  async function handleGenreChange(genres) {
    setSelectedGenres(genres);
  }

  // Sets the selected nenbers to reflect the selections user makes in invite dropdown button
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

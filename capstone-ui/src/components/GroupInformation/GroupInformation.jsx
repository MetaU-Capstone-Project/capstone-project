import React, { useState } from "react";
import Select from "react-select";
import "./GroupInformation.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getGenres } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component to display individual group's information (members, preferences, etc.)
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {string} props.groupName Name of specified group
 */
export default function GroupInformation({ username, groupName }) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [description, setDescription] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [memberOptions, setMemberOptions] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      // Populates the genre options for the genre preference dropdown button
      setGenreOptions(
        (await getGenres()).data.genres.map((genre) => {
          return { value: genre, label: genre };
        })
      );

      // Retrieve and set the values for the group description and genre preferences
      let groupInfo = await axios.get(
        `http://localhost:3001/user/group/${groupName}`
      );

      setDescription(groupInfo.data.description);
      setSelectedGenres(groupInfo.data.genres);

      // Checks if the user is a member or admin of the group
      setIsAdmin(
        (
          await axios.post(`http://localhost:3001/user/membershipstatus`, {
            username: username,
            groupName: groupName,
          })
        ).data.isAdmin
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

  // Saves the selected genres as group's genre preferences in Parse
  async function handleGenreChange(e) {
    setSelectedGenres(
      await axios.post("http://localhost:3001/user/groupgenres", {
        groupName: groupName,
        genres: e,
      })
    );
  }

  // Saves the description as group's description in Parse
  async function handleDescriptionChange(e) {
    setDescription(e.target.value);
    await axios.post("http://localhost:3001/user/groupdescription", {
      groupName: groupName,
      description: e.target.value,
    });
  }

  // Sets the selected members to be invited to reflect the selections user makes
  async function handleMemberChange(e) {
    setSelectedMembers(e);
  }

  // Sends invites to all the members selected in the invite dropdown button
  async function inviteMembers() {
    for (let i = 0; i < selectedMembers.length; i++) {
      axios.post("http://localhost:3001/user/invite", {
        username: selectedMembers[i].value,
        groupName: groupName,
      });
    }

    alert(`Sent invites for ${groupName}!`);
    setSelectedMembers([]);
  }

  return (
    <div className="groupinformation-component">
      {description != null && genreOptions != null && isAdmin != undefined ? (
        <>
          <div className="preferences">
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Description</span>
              {isAdmin === true && (
                <textarea
                  className="description-input"
                  onChange={handleDescriptionChange}
                  value={description}
                  placeholder="Description"
                ></textarea>
              )}
              {isAdmin === false && (
                <textarea
                  className="description-input"
                  value={description}
                  placeholder="Description"
                  readOnly
                ></textarea>
              )}
            </div>
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Genres</span>
              {isAdmin === true && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                  isMulti
                  options={genreOptions}
                  onChange={handleGenreChange}
                />
              )}
              {isAdmin === false && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                />
              )}
            </div>
            {isAdmin === true && (
              <div className="groupinformation-wrapper">
                <span className="preference-heading">Invite</span>
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedMembers}
                  isMulti
                  options={memberOptions}
                  onChange={handleMemberChange}
                />
                <button className="invite-group-button" onClick={inviteMembers}>
                  Invite
                </button>
              </div>
            )}
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Membership Status:</span>
              <span>{isAdmin ? "Admin" : "Member"}</span>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}

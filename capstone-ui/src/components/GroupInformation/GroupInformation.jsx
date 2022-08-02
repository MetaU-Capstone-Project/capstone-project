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
  const [isAdmin, setIsAdmin] = useState(false);
  const [inviteOptions, setInviteOptions] = useState(null);
  const [selectedInvites, setSelectedInvites] = useState([]);

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

      // Populates the invite options for the invite dropdown button with the user's friends who aren't already members
      let members = (
        await axios.get(`http://localhost:3001/user/members/${groupName}`)
      ).data;
      let followers = (
        await axios.get(`http://localhost:3001/user/followers/${username}`)
      ).data;

      let nonInvited = followers.filter((follower) =>
        members.some((member) => member.username !== follower)
      );

      setInviteOptions(
        nonInvited.map((invite) => {
          return { value: invite, label: invite };
        })
      );
    };

    catchErrors(fetchData());
  }, []);

  // Saves the selected genres as group's genre preferences in Parse
  async function handleGenreChange(e) {
    await axios.post("http://localhost:3001/user/groupgenres", {
      groupName: groupName,
      genres: e,
    });
    setSelectedGenres(e);
  }

  // Saves the description as group's description in Parse
  async function handleDescriptionChange(e) {
    setDescription(e.target.value);
    await axios.post("http://localhost:3001/user/groupdescription", {
      groupName: groupName,
      description: e.target.value,
    });
  }

  // Sets the selected invites to be invited to reflect the selections user makes
  async function handleInviteChange(e) {
    setSelectedInvites(e);
  }

  // Sends invites to all the members selected in the invite dropdown button
  async function inviteMembers() {
    for (let i = 0; i < selectedInvites.length; i++) {
      axios.post("http://localhost:3001/user/invite", {
        username: selectedInvites[i].value,
        groupName: groupName,
      });
    }

    alert(`Sent invites for ${groupName}!`);
    setSelectedInvites([]);
  }

  return (
    <div className="groupinformation-component">
      {description != null && genreOptions != null ? (
        <>
          <div className="preferences">
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Description</span>
              {isAdmin && (
                <textarea
                  className="description-input"
                  onChange={handleDescriptionChange}
                  value={description}
                  placeholder="Description"
                ></textarea>
              )}
              {!isAdmin && (
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
              {isAdmin && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                  isMulti
                  options={genreOptions}
                  onChange={handleGenreChange}
                />
              )}
              {!isAdmin && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                />
              )}
            </div>
            {isAdmin && (
              <div className="groupinformation-wrapper">
                <span className="preference-heading">Invite</span>
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedInvites}
                  isMulti
                  options={inviteOptions}
                  onChange={handleInviteChange}
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

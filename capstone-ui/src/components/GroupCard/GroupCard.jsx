import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./GroupCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../../spotify";
import { formatDate } from "../../utils";
import Switch from "react-switch";
import Select from "react-select";

import logo from "../../logo.svg";

export default function GroupCard({
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
  const [isPrivate, setIsPrivate] = useState("");

  function handleTabChange(e) {
    setTab(e.target.id);
    e.target.className = "is-active";
  }

  function handleSwitch(e) {
    setIsPrivate(e);
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
        <textarea className="description-input">Group description</textarea>
      </div>
      <label>
        <span>{isPrivate ? "Private" : "Public"}</span>
        <Switch onChange={handleSwitch} checked={isPrivate} />
      </label>
      <div className="group-select-wrapper">
        <span>Genres</span>
        <Select
          className="preference-select"
          closeMenuOnSelect={false}
          value={[]}
          isMulti
          options={[]}
        />
      </div>
      <div className="group-select-wrapper">
        <span>Artists</span>
        <Select
          className="preference-select"
          closeMenuOnSelect={false}
          value={[]}
          isMulti
          options={[]}
        />
      </div>
      <div className="register-buttons">
        <Link to={"/"}>
          <button className="go-back-button">Go Back</button>
        </Link>
        <button className="register-button">Register</button>
      </div>
    </div>
  );
}

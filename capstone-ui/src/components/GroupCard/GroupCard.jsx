import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./GroupCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../../spotify";
import { formatDate } from "../../utils";

import logo from "../../logo.svg";

export default function GroupCard({
  username,
  token,
  profile,
  appProfile,
  tab,
  setTab,
  group,
}) {
  function handleTabChange(e) {
    setTab(e.target.id);
    e.target.className = "is-active";
  }

  const leaveGroup = async (e) => {
    axios
      .post(`http://localhost:3001/user/leavegroup`, {
        username: username,
        groupName: group.name,
      })
      .then(function (response) {
        alert(`You have left ${group.name} succesfully!`);
        setTab("feed");
      });
  };

  return (
    <div className="groupcard-component">
      <div className="group-info-wrapper">
        <span className="group-name-text">{group.name}</span>
        <span className="profile-join-date">
          Group created {formatDate(group.createdAt)}
        </span>
      </div>
      <div className="group-buttons">
        <button
          id="feed"
          className={tab === "feed" ? "is-active" : "profile-friends-button"}
          onClick={handleTabChange}
        >
          Feed
        </button>
        <button
          id="members"
          className={tab === "members" ? "is-active" : "profile-friends-button"}
          onClick={handleTabChange}
        >
          Members
        </button>
        <button
          id="information"
          className={
            tab === "information" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Information
        </button>
      </div>
      <div className="delete-account-wrapper">
        <button className="delete-account-button" onClick={leaveGroup}>
          Leave Group
        </button>
        <button className="logout-account-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

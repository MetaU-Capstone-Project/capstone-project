import React, { useState } from "react";
import "./Groups.css";
import SearchBar from "../SearchBar/SearchBar";
import GroupHeader from "../GroupHeader/GroupHeader";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupInbox from "../GroupInbox/GroupInbox";

export default function Groups({ username }) {
  return (
    <div className="groups-page">
      <div className="groups-heading-wrapper">
        <span className="groups-heading">Search</span>
      </div>
      <div className="groups-heading-wrapper">
        <span className="groups-heading">Your Groups</span>
      </div>
      <div className="group-inbox-wrapper">
        <GroupInbox username={username}></GroupInbox>
      </div>
      <div className="groups-grid">
        <CreateGroup username={username}></CreateGroup>
      </div>
    </div>
  );
}

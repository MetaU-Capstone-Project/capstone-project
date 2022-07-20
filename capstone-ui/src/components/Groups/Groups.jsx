import React, { useState } from "react";
import "./Groups.css";
import SearchBar from "../SearchBar/SearchBar";
import GroupHeader from "../GroupHeader/GroupHeader";
import GroupCard from "../GroupCard/GroupCard";

export default function Groups({}) {
  return (
    <div className="groups-page">
      <div className="groups-heading-wrapper">
        <span className="groups-heading">Search</span>
      </div>
      <div className="groups-heading-wrapper">
        <span className="groups-heading">Your Groups</span>
      </div>
      <div className="groups-grid">
        <GroupCard></GroupCard>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./GroupHeader.css";
import axios from "axios";

export default function GroupHeader({ username, token, profile }) {
  return (
    <div className="groupheader-component">
      <div className="groupheader-info-wrapper">
        <span className="group-info">Group Name</span>
        <span className="group-info"># of members</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./GroupHeader.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GroupHeader({
  username,
  token,
  profile,
  group,
  setShouldUpdateInbox,
}) {
  const [isMember, setIsMember] = useState(false);

  const joinGroup = async (e) => {
    let groupName =
      e.target.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[0]
        .innerText;

    e.preventDefault();
    axios
      .post("http://localhost:3001/user/joingroup", {
        username: username,
        groupName: groupName,
      })
      .then(function (response) {
        alert(`You have joined ${groupName}!`);
        setIsMember(true);
      })
      .catch(function (error) {
        alert(`Error! ${error.message}`);
      });
    if (setShouldUpdateInbox && typeof setShouldUpdateInbox == "function") {
      setShouldUpdateInbox(true);
    }
  };

  return (
    <div className="groupheader-component">
      <Link to={`/group/${group.name}`}>
        <div className="groupheader-info-wrapper">
          <span className="group-info">{group.groupName}</span>
        </div>
      </Link>
      {!isMember && (
        <div className="groupheader-button-wrapper">
          <button className="join-group-button" onClick={joinGroup}>
            Join
          </button>
        </div>
      )}
    </div>
  );
}

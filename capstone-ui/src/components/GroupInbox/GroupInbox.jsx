import React, { useState } from "react";
import GroupHeader from "../GroupHeader/GroupHeader";
import "./GroupInbox.css";
import axios from "axios";
import { catchErrors } from "../../utils";

export default function GroupInbox({
  username,
  myGroups,
  inbox,
  setShouldUpdateGroupPage,
}) {
  return (
    <div className="groupinbox-component">
      <div className="groupinbox-heading-wrapper">
        <span className="groupinbox-heading">Your Groups</span>
      </div>
      <div className="inbox-grid">
        {myGroups &&
          myGroups.map((element) => (
            <GroupHeader
              key={element.groupName}
              group={element}
              username={username}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
            ></GroupHeader>
          ))}
      </div>
      <div className="groupinbox-heading-wrapper">
        <span className="groupinbox-heading">Inbox</span>
      </div>
      <div className="inbox-grid">
        {inbox && inbox.length === 0 && (
          <span className="invites-text">No invites!</span>
        )}
        {inbox &&
          inbox.map((element) => (
            <GroupHeader
              key={element.groupName}
              group={element}
              username={username}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
            ></GroupHeader>
          ))}
      </div>
    </div>
  );
}

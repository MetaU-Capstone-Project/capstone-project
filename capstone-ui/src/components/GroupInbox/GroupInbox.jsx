import React, { useState } from "react";
import GroupHeader from "../GroupHeader/GroupHeader";
import "./GroupInbox.css";
import axios from "axios";
import { catchErrors } from "../../utils";

export default function GroupInbox({ username }) {
  const [inbox, setInbox] = React.useState([]);
  const [shouldUpdateInbox, setShouldUpdateInbox] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/user/inbox/${username}`
      );
      setInbox(data);
    };

    catchErrors(fetchData());
    setShouldUpdateInbox(false);
  }, [shouldUpdateInbox]);

  return (
    <div className="groupinbox-component">
      <div className="groupinbox-heading-wrapper">
        <span className="groupinbox-heading">Inbox</span>
      </div>
      <div className="inbox-grid">
        {inbox.map((invite) => (
          <GroupHeader
            key={invite.groupName}
            group={invite}
            username={username}
            setShouldUpdateInbox={setShouldUpdateInbox}
          ></GroupHeader>
        ))}
      </div>
    </div>
  );
}

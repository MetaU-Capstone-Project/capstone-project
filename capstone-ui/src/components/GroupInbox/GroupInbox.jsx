import React from "react";
import GroupHeader from "../GroupHeader/GroupHeader";
import "./GroupInbox.css";
import axios from "axios";
import { catchErrors } from "../../utils";

/**
 * Component to display current user's groups, along with invites to new groups
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {Array<object>} props.myGroups Array of groups that user is a member of
 * @param {Function} props.setShouldUpdateGroupPage Handler for triggering rerendering of group page after user changes membership status (joins/leaves)
 */
export default function GroupInbox({
  username,
  myGroups,
  setShouldUpdateGroupPage,
}) {
  const [inbox, setInbox] = React.useState([]);
  const [shouldUpdateInbox, setShouldUpdateInbox] = React.useState(false);

  // Sets the inbox with all the invites that the user has
  React.useEffect(() => {
    const fetchData = async () => {
      setInbox(
        (await axios.get(`http://localhost:3001/user/inbox/${username}`)).data
      );
    };

    catchErrors(fetchData());
    setShouldUpdateInbox(false);
  }, [shouldUpdateInbox]);

  return (
    <div className="groupinbox-component">
      <div className="groupinbox-heading-wrapper">
        <span className="groupinbox-heading">Your Groups</span>
      </div>
      <div className="inbox-grid">
        {myGroups &&
          myGroups.map((group) => (
            <GroupHeader
              key={group.groupName}
              group={group}
              username={username}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
            ></GroupHeader>
          ))}
      </div>
      <div className="groupinbox-heading-wrapper">
        <span className="groupinbox-heading">Inbox</span>
      </div>
      <div className="inbox-grid">
        {inbox.map((invite) => (
          <GroupHeader
            key={invite.groupName}
            group={invite}
            username={username}
            setShouldUpdateGroupPage={setShouldUpdateGroupPage}
          ></GroupHeader>
        ))}
      </div>
    </div>
  );
}

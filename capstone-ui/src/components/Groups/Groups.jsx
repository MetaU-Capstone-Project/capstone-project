import React, { useState } from "react";
import "./Groups.css";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupInbox from "../GroupInbox/GroupInbox";
import axios from "axios";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Page for displaying current user's groups/invites and creating new groups
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 */
export default function Groups({ username }) {
  const [shouldUpdateGroupPage, setShouldUpdateGroupPage] = useState(false);
  const [inbox, setInbox] = React.useState(null);
  const [myGroups, setMyGroups] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      // Populates inbox with current user's invites
      setInbox(await axios.get(`http://localhost:3001/user/inbox/${username}`));

      // Retrieves all the groups current user is a member of
      setMyGroups(
        (await axios.get(`http://localhost:3001/user/groups/${username}`)).data
      );
    };

    catchErrors(fetchData());
    setShouldUpdateGroupPage(false);
    setIsFetching(false);
  }, [shouldUpdateGroupPage]);

  return (
    <div className="groups-page">
      {isFetching === false ? (
        <>
          <div className="group-inbox-wrapper">
            <GroupInbox
              username={username}
              inbox={inbox}
              myGroups={myGroups}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
            ></GroupInbox>
          </div>
          <div className="groups-grid">
            <CreateGroup
              username={username}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
            ></CreateGroup>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}

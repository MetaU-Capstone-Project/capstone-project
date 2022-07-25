import React, { useState } from "react";
import "./Groups.css";
import SearchBar from "../SearchBar/SearchBar";
import GroupHeader from "../GroupHeader/GroupHeader";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupInbox from "../GroupInbox/GroupInbox";
import axios from "axios";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Groups({ username }) {
  const [shouldUpdateGroupPage, setShouldUpdateGroupPage] = useState(false);

  const [inbox, setInbox] = React.useState(null);
  const [myGroups, setMyGroups] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      const { data } = await axios.get(
        `http://localhost:3001/user/inbox/${username}`
      );
      setInbox(data);

      let myGroupsResponse = await axios.get(
        `http://localhost:3001/user/groups/${username}`
      );
      setMyGroups(myGroupsResponse.data);
    };

    catchErrors(fetchData());
    setShouldUpdateGroupPage(false);

    setIsFetching(false);
  }, [shouldUpdateGroupPage]);

  return (
    <div className="groups-page">
      {!isFetching ? (
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

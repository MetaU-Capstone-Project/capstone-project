import React, { useState } from "react";
import "./Groups.css";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupInbox from "../GroupInbox/GroupInbox";
import axios from "axios";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { showPopup, hidePopup } from "../../utils";
import GroupDetails from "../GroupDetails/GroupDetails";

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
  const [isHovering, setIsHovering] = useState(false);
  const [hoverGroupName, setHoverGroupName] = useState(null);

  // Display popup if user hovers over a profile
  const handleMouseOver = (username) => {
    setIsHovering(true);
    showPopup();
    setHoverGroupName(username);
    setShouldUpdateGroupPage(true);
  };

  // Hide popup if user stops hovering over a profile
  const handleMouseOut = () => {
    setIsHovering(false);
    hidePopup();
    setShouldUpdateGroupPage(false);
  };

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
      {/* Displays popup with group details if user is hovering over an inbox group*/}
      <div id="overlay">
        <div className="profile-details-wrapper">
          {hoverGroupName != null && (
            <GroupDetails groupName={hoverGroupName}></GroupDetails>
          )}
        </div>
      </div>
      {isFetching === false ? (
        <>
          <div className="group-inbox-wrapper">
            <GroupInbox
              username={username}
              inbox={inbox}
              myGroups={myGroups}
              setShouldUpdateGroupPage={setShouldUpdateGroupPage}
              handleMouseOut={handleMouseOut}
              handleMouseOver={handleMouseOver}
            ></GroupInbox>
          </div>
          <div className="groups-grid">
            <div className="groups-heading-wrapper">
              <span className="groups-heading">Create Group</span>
            </div>
            <div className="create-group-wrapper">
              <CreateGroup
                username={username}
                setShouldUpdateGroupPage={setShouldUpdateGroupPage}
              ></CreateGroup>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}

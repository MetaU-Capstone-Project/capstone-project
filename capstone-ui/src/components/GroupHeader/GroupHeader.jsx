import React, { useState } from "react";
import "./GroupHeader.css";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * Component to display individual group name and current user's membership status with group
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {object} props.group Information about specified group
 * @param {Function} props.setShouldUpdateGroupPage Handler for triggering rerendering of group page after user changes membership status (joins/leaves)
 */
export default function GroupHeader({
  username,
  group,
  setShouldUpdateGroupPage,
}) {
  const [isMember, setIsMember] = useState(false);

  // Checks if the current user is a member of the group to mark membership status
  React.useEffect(() => {
    async function getMembers() {
      if (
        (
          await axios.get(
            `http://localhost:3001/user/members/${group.groupName}`
          )
        ).data.some((member) => member.username === username)
      ) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    }
    getMembers();
  }, []);

  // Adds user to group upon success and displays message
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
    if (
      setShouldUpdateGroupPage &&
      typeof setShouldUpdateGroupPage == "function"
    ) {
      setShouldUpdateGroupPage(true);
    }
  };

  return (
    <div className="groupheader-component">
      <Link to={`/group/${group.groupName}`}>
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

import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Members.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * Component for displaying members of specified group
 * @param {object} props Component props
 * @param {string} props.username Username of member to be displayed
 * @param {string} props.currentUserUsername Username of current user
 * @param {string} props.groupName Name of specified group
 */
export default function Members({ username, currentUserUsername, groupName }) {
  const [members, setMembers] = useState(null);
  const [shouldUpdateMemberStatus, setShouldUpdateMemberStatus] =
    useState(false);

  // Retrieves all the members of specified group
  React.useEffect(() => {
    async function getMembers() {
      setMembers(
        (await axios.get(`http://localhost:3001/user/members/${groupName}`))
          .data
      );
    }
    getMembers();
    setShouldUpdateMemberStatus(false);
  }, [shouldUpdateMemberStatus]);

  return (
    <div className="members-component">
      {members ? (
        members.map((member) => (
          <ProfileHeader
            profile={member}
            key={member.username}
            isFollowersView={true}
            username={username}
            currentUserUsername={currentUserUsername}
            setShouldUpdateProfileHeader={setShouldUpdateMemberStatus}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

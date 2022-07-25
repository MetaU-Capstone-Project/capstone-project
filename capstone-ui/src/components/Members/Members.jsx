import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import "./Members.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Members({
  username,
  token,
  profile,
  currentUserUsername,
  groupName,
}) {
  const [members, setMembers] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  React.useEffect(() => {
    async function getMembers() {
      const response = await axios.get(
        `http://localhost:3001/user/members/${groupName}`
      );

      setMembers(response.data);
    }
    getMembers();
    setShouldUpdate(false);
  }, [shouldUpdate]);

  return (
    <div className="members-component">
      {members ? (
        members.map((element) => (
          <ProfileHeader
            profile={element}
            key={element.username}
            token={token}
            isFollowersView={true}
            username={username}
            currentUserUsername={currentUserUsername}
            setShouldUpdate={setShouldUpdate}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

import React from "react";
import "./Group.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import GroupCard from "../GroupCard/GroupCard";
import Members from "../Members/Members";
import GroupInformation from "../GroupInformation/GroupInformation";
import GroupFeed from "../GroupFeed/GroupFeed";

/**
 * Page for displaying information about individual group
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {object} props.profile App profile information about current user
 */
export default function Group({ username, profile }) {
  let { groupname } = useParams();
  const [groupInfo, setGroupInfo] = React.useState(null);
  const [tab, setTab] = React.useState("feed");

  // Retrieves information about group identified by specified group name
  React.useEffect(() => {
    const fetchData = async () => {
      setGroupInfo(
        (await axios.get(`http://localhost:3001/user/group/${groupname}`)).data
      );
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="group-page">
      <div className="groupcard-component-wrapper">
        {groupInfo ? (
          <GroupCard
            username={username}
            group={groupInfo}
            tab={tab}
            setTab={setTab}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {tab == "feed" && (
        <div className="timeline-wrapper">
          <span className="timeline-heading">Feed</span>
          {groupInfo ? (
            <GroupFeed
              username={username}
              profile={profile}
              groupName={groupInfo.name}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
      {tab == "members" && (
        <div className="settings-wrapper">
          <span className="settings-heading">Members</span>
          {groupInfo ? (
            <Members
              username={username}
              groupName={groupInfo.name}
              currentUserUsername={username}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
      {tab == "information" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Information</span>
          {groupInfo ? (
            <GroupInformation username={username} groupName={groupInfo.name} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
    </div>
  );
}

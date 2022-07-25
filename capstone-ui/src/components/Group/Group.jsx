import React, { useState } from "react";
import "./Group.css";
import axios from "axios";
import GroupHeader from "../GroupHeader/GroupHeader";
import { useParams } from "react-router-dom";
import { catchErrors } from "../../utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import GroupCard from "../GroupCard/GroupCard";
import Members from "../Members/Members";
import GroupInformation from "../GroupInformation/GroupInformation";

export default function Group({
  username,
  token,
  profile,
  recs,
  setShouldUpdateFeed,
}) {
  let { name } = useParams();
  const [groupInfo, setGroupInfo] = React.useState(null);
  const [tab, setTab] = React.useState("feed");

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/user/group/${name}`
      );
      setGroupInfo(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="group-page">
      <div className="groupcard-component-wrapper">
        {groupInfo ? (
          <GroupCard
            username={username}
            profile={profile}
            group={groupInfo}
            tab={tab}
            setTab={setTab}
          ></GroupCard>
        ) : (
          <LoadingSpinner></LoadingSpinner>
        )}
      </div>
      {tab == "feed" && (
        <div className="timeline-wrapper">
          <span className="timeline-heading">Feed</span>
        </div>
      )}
      {tab == "members" && (
        <div className="settings-wrapper">
          <span className="settings-heading">Members</span>
          {groupInfo ? (
            <Members
              username={username}
              token={token}
              profile={profile}
              groupName={groupInfo.name}
            ></Members>
          ) : (
            <LoadingSpinner></LoadingSpinner>
          )}
        </div>
      )}
      {tab == "information" && (
        <div className="followers-wrapper">
          <span className="followers-heading">Information</span>
          {groupInfo ? (
            <GroupInformation
              username={username}
              token={token}
              profile={profile}
              groupName={groupInfo.name}
            ></GroupInformation>
          ) : (
            <LoadingSpinner></LoadingSpinner>
          )}
        </div>
      )}
    </div>
  );
}

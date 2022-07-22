import React, { useState } from "react";
import "./Group.css";
import axios from "axios";
import GroupHeader from "../GroupHeader/GroupHeader";
import { useParams } from "react-router-dom";
import { catchErrors } from "../../utils";

export default function Group({
  username,
  token,
  profile,
  recs,
  setShouldUpdateFeed,
}) {
  let { name } = useParams();
  const [groupInfo, setGroupInfo] = React.useState();

  // TODO - sidebar

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/user/group/${name}`
      );
      setGroupInfo(data);

      console.log("group info");
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="group-page">
      <GroupHeader group={{ name: name }}></GroupHeader>
    </div>
  );
}

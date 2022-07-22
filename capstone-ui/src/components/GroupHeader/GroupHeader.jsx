import React, { useState } from "react";
import "./GroupHeader.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GroupHeader({
  username,
  token,
  profile,
  // isMember,
  group,
  // added
  setShouldUpdateInbox,
}) {
  const [isMember, setIsMember] = useState(false);

  // React.useEffect(() => {
  //   async function getFollowers() {
  //     const response = await axios.get(
  //       `http://localhost:3001/user/groups/${username}`
  //     );

  //     console.log("my username");
  //     console.log(username);
  //     console.log("my groups");
  //     console.log(response.data);
  //     // if (
  //     //   response.data.includes(viewUsername)
  //     // ) {
  //     //   setIsFollowing(true);
  //     // } else {
  //     //   setIsFollowing(false);
  //     // }
  //   }
  //   getFollowers();
  // }, []);

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
    if (setShouldUpdateInbox && typeof setShouldUpdateInbox == "function") {
      setShouldUpdateInbox(true);
    }
  };

  // TODO
  // const unfollowUser = async (e) => {
  //   let unfollowUsername =
  //     e.target.parentNode.childNodes[0].childNodes[1].childNodes[0].innerText;

  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/user/unfollowUser", {
  //       currUsername: username,
  //       unfollowUsername: unfollowUsername,
  //     })
  //     .then(function (response) {
  //       alert(`You have unfollowed ${unfollowUsername}.`);
  //       setIsFollowing(false);
  //     })
  //     .catch(function (error) {
  //       alert(`Error! ${error.message}`);
  //     });

  //   if (setShouldUpdate && typeof setShouldUpdate == "function") {
  //     setShouldUpdate(true);
  //   }

  //   if (setShouldUpdateFeed && typeof setShouldUpdateFeed == "function") {
  //     setShouldUpdateFeed(true);
  //   }
  // };

  return (
    <div className="groupheader-component">
      <Link to={`/group/${group.name}`}>
        <div className="groupheader-info-wrapper">
          <span className="group-info">{group.groupName}</span>
          {/* <span className="group-info"># of members</span> */}
        </div>
      </Link>
      {!isMember && (
        <div className="groupheader-button-wrapper">
          {/* TODO - condiitonal rendering for join / request access */}
          <button className="join-group-button" onClick={joinGroup}>
            Join
          </button>
          {/* <button className="request-access-button">Request</button> */}
        </div>
      )}
    </div>
  );
}

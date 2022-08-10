import "./GroupCard.css";
import axios from "axios";
import { logout } from "../../spotify";
import { formatDate } from "../../utils";
import Home from "../Home/Home";

/**
 * Component to display individual group information and tabs to learn more
 * @param {object} props Component props
 * @param {string} props.username Username of current user
 * @param {string} props.tab Identifier of tab that user is currently viewing
 * @param {object} props.group Information about the group the user is viewing
 */
export default function GroupCard({ username, tab, setTab, group }) {
  // Highlights the tab that the user is currently on
  function handleTabChange(tab) {
    setTab(tab.target.id);
    tab.target.className = "is-active";
  }

  // Alerts user that they have left the current group
  const leaveGroup = async (e) => {
    axios
      .post(`http://localhost:3001/user/leavegroup`, {
        username: username,
        groupName: group.name,
      })
      .then(function (response) {
        alert(`You have left ${group.name} succesfully!`);
      });
  };

  return (
    <div className="groupcard-component">
      <div className="group-info-wrapper">
        <span className="group-name-text">{group.name}</span>
        <span className="profile-join-date">
          Group created {formatDate(group.createdAt)}
        </span>
      </div>
      <div className="group-buttons">
        <button
          id="feed"
          className={tab === "feed" ? "is-active" : "profile-friends-button"}
          onClick={handleTabChange}
        >
          Feed
        </button>
        <button
          id="members"
          className={tab === "members" ? "is-active" : "profile-friends-button"}
          onClick={handleTabChange}
        >
          Members
        </button>
        <button
          id="information"
          className={
            tab === "information" ? "is-active" : "profile-friends-button"
          }
          onClick={handleTabChange}
        >
          Information
        </button>
      </div>
      <div className="delete-account-wrapper">
        <button className="delete-account-button" onClick={leaveGroup}>
          Leave Group
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./Chat.css";
import ChatPage from "../ChatPage/ChatPage";
import axios from "axios";

export default function Chat({ username }) {
  const [senderNicknameInput, setSenderNicknameInput] = useState(username);
  const [senderNicknameId, setSenderNicknameId] = useState(null);
  const [receiverNicknameInput, setReceiverNicknameInput] = useState("");
  const [receiverNicknameId, setReceiverNicknameId] = useState(null);

  // Create or retrieve Nickname objects and start LiveChat component
  const startLiveChat = async () => {
    // Check if user informed both nicknames
    if (senderNicknameInput === null || receiverNicknameInput === null) {
      alert("Please inform both sender and receiver nicknames!");
      return false;
    }

    // Create new parse object to represent receiver
    const receiverNicknameObjectResponse = await axios.post(
      "http://localhost:3001/user/nickname",
      {
        nickname: receiverNicknameInput,
      }
    );

    // Check if user that current user is trying to send message to exists
    if (!receiverNicknameObjectResponse.data) {
      alert(`${receiverNicknameInput} does not exist as a user.`);
      setReceiverNicknameInput("");
      return false;
    }

    // Create new parse object to represent sender
    const senderNicknameObjectResponse = await axios.post(
      "http://localhost:3001/user/nickname",
      {
        nickname: senderNicknameInput,
      }
    );

    // Set nickname objects ids, so live chat component is instantiated
    setSenderNicknameId(senderNicknameObjectResponse.data.objectId);
    setReceiverNicknameId(receiverNicknameObjectResponse.data.objectId);
  };

  return (
    <div className="chat-page">
      <div className="chat-heading-wrapper">
        <span className="chat-heading">Chat</span>
      </div>
      <div className="chat-container">
        {senderNicknameId === null && receiverNicknameId === null && (
          <div className="chat-users-wrapper">
            <input
              className="chat-input"
              value={username}
              onChange={(event) => setSenderNicknameInput(event.target.value)}
              placeholder={username}
              readOnly
            />
            <input
              className="chat-input"
              value={receiverNicknameInput}
              onChange={(event) => setReceiverNicknameInput(event.target.value)}
              placeholder={"Receiver"}
            />
            <button onClick={startLiveChat} className="chat-button">
              Chat
            </button>
          </div>
        )}
        {senderNicknameId !== null && receiverNicknameId !== null && (
          <ChatPage
            senderNicknameName={senderNicknameInput}
            senderNicknameId={senderNicknameId}
            receiverNicknameName={receiverNicknameInput}
            receiverNicknameId={receiverNicknameId}
          />
        )}
      </div>
    </div>
  );
}

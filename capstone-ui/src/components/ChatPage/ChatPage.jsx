import React, { useState } from "react";
import "./ChatPage.css";
import { useParseQuery } from "@parse/react";
import Parse from "parse";
import axios from "axios";
import { formatChatDateToTime } from "../../utils";

export default function ChatPage({
  senderNicknameName,
  senderNicknameId,
  receiverNicknameName,
  receiverNicknameId,
}) {
  // Text of message to be sent
  const [messageInput, setMessageInput] = useState("");

  // Create parse query for live querying using useParseQuery hook
  const parseQuery = new Parse.Query("Message");
  // Get messages that involve both nicknames
  parseQuery.containedIn("sender", [senderNicknameId, receiverNicknameId]);
  parseQuery.containedIn("receiver", [senderNicknameId, receiverNicknameId]);
  // Set results ordering
  parseQuery.ascending("createdAt");
  // Include nickname fields, to enable name getting on list
  parseQuery.includeAll();

  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  const sendMessage = async () => {
    // Send message from sender to receiver by creating Parse message object
    await axios
      .post("http://localhost:3001/user/message", {
        message: messageInput,
        senderNicknameId: senderNicknameId,
        receiverNicknameId: receiverNicknameId,
      })
      .catch((error) => {
        alert(`Error sending message ${messageInput}`);
      });

    setMessageInput("");
  };

  return (
    <div className="chat-component">
      <div className="chat-users-heading-wrapper">
        <span className="chat-users-heading">{`${senderNicknameName} → ${receiverNicknameName}`}</span>
        <button onClick={reload} className="chat-button">
          Refresh
        </button>
      </div>
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === senderNicknameId
                    ? "message-sent"
                    : "message-received"
                }
              >
                <div className="message-bubble">
                  <p className="message-text">{result.get("text")}</p>
                </div>
                <div
                  className={
                    result.get("sender").id === senderNicknameId
                      ? "sent-message-info-wrapper"
                      : "received-message-info-wrapper"
                  }
                >
                  <p className="message-time">
                    {formatChatDateToTime(result.get("createdAt"))}
                  </p>
                  <p className="message-name">
                    {result.get("sender").get("name")}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="new_message-wrapper">
        <h2 className="new_message_title">New message</h2>
        <div className="send-message-wrapper">
          <input
            className="chat-input"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            placeholder={"Your message..."}
            size="large"
          />
          <button type="primary" className="chat-button" onClick={sendMessage}>
            Send message
          </button>
        </div>
      </div>
      <div>
        {isLoading && <p>{"Loading…"}</p>}
        {isSyncing && <p>{"Syncing…"}</p>}
        {isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div>
    </div>
  );
}

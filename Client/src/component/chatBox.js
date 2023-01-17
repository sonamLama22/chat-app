import React, { useState, useEffect } from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";
import "../App.js";

const ChatBox = ({ selectedUser, socket }) => {
  const { name } = useSelector((state) => state.user);
  // console.log(name);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message }); //emits this event called "send_message" to the Server.
  };

  //listen to the event emitted by Server
  //useEffect is called whenever a message is received.
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="chatbox">
      <div className="chatHeader">
        <div className="username">
          <h3>
            {/* {selectedChat ? (
              <p>{selectedChat.name}</p>
            ) : (
              <p>No chat selected</p>
            )} */}
            {selectedUser ? (
              <p>{selectedUser} </p>
            ) : (
              <p>please select a chat </p>
            )}
          </h3>
        </div>
      </div>
      <div className="messageBox">
        <p className="chatMessage">
          <span className="messageName">another user</span>
          Message that a user receives
          {messageReceived}
        </p>
        <p className="chatMessage receive">
          <span className="messageName">{name} </span>
          Message sent by the user
          {message}
        </p>
      </div>
      <div className="message__status">
        <p>Someone is typing...</p>
      </div>
      <div className="messageInput">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;

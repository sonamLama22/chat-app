import React, { useState, useEffect } from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";
import "../App.js";

const ChatBox = ({ selectedUser, socket, chat, setChat }) => {
  const { name } = useSelector((state) => state.user);
  // console.log(name);
  const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");
  // const [chat, setChat] = useState([]); //chat is an array with long list of messages
  // console.log(message);
  //emits this event called "send_message" to the Server.
  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit("send_message", { message });

  //   setMessage(""); //removes text from inputfield after submitting the text
  // };

  //listen to the event "receiveMessage" emitted by Server
  //useEffect is called whenever a message is received.
  // useEffect(() => {
  //   socket.on("receiveMessage", (data) => {
  //     console.log(data);
  //     setChat([...chat, data]);
  //   }); //listen to message from server
  // }, [socket, data]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: name, message: message }),
    };

    const response = await fetch("http://localhost:4000/chat", requestOptions);
    const data = await response.json();

    if (data) {
      alert("message sent");
      // setChat(data.messages);
      console.log(data);
    }

    setMessage("");
  };

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
          <span className="messageName">
            {selectedUser[0].toUpperCase() + selectedUser.substring(1)}
          </span>
          {/* Message that a user receives */}
          {message}
        </p>

        <p className="chatMessage receive">
          <span className="messageName">
            {/* {name[0].toUpperCase() + name.substring(1)} */}
            You
          </span>
          {/* Message sent by the user */}
          {message}
        </p>
      </div>
      {/* <div className="message__status">
        <p>Someone is typing...</p>
      </div> */}

      <div className="messageInput">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;

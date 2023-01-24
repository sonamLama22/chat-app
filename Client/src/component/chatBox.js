import React, { useState, useEffect } from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";
import "../App.js";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ChatBox = ({ selectedUser, socket }) => {
  const { name } = useSelector((state) => state.user);
  // console.log(name);
  const [sentMessage, setSentMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: name,
        message: sentMessage,
        receiver: selectedUser,
      }),
    };

    const response = await fetch("http://localhost:4000/chat", requestOptions);
    const data = await response.json();

    if (data) {
      // console.log(data.message);
      // setChat(data.message);
      // console.log(chat);
      socket.emit("send message", data.message);
      setSentMessage("");
    }
  };

  //listen to the event "receiveMessage" emitted by Server
  //useEffect is called whenever a message is received.
  // useEffect(() => {
  //   socket.on("receive message", (msg) => {
  //     console.log(`received message: ${msg}`);
  //     setMessageReceived(msg);
  //     const newMsg = [...chat, msg];
  //     setChat(newMsg);
  //   });
  // }, [socket, chat]);

  const fetchMsg = async () => {
    const response = await fetch("http://localhost:4000/chat");
    const data = await response.json();
    console.log(data);
    if (data) {
      setChat(data.messages);
      // console.log(data.usersList);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

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
        {chat.length > 0
          ? chat.map((msg) => {
              if (msg.sender === name) {
                return (
                  <p className="chatMessage receive" key={msg._id}>
                    <span className="messageName">You</span>

                    {msg.message}
                  </p>
                );
              } else
                return (
                  <p className="chatMessage" key={msg._id}>
                    <span className="messageName">
                      {selectedUser[0].toUpperCase() +
                        selectedUser.substring(1)}
                    </span>

                    {msg.message}
                  </p>
                );
            })
          : "chat not found."}
      </div>
      {/* <div className="message__status">
        <p>Someone is typing...</p>
      </div> */}

      <div className="messageInput">
        <form onSubmit={sendMessage}>
          <input
            value={sentMessage}
            onChange={(e) => setSentMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          {/* <button type="submit">send</button> */}
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;

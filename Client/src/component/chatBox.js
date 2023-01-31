import React, { useState, useEffect, useRef } from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";
import "../App.js";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const ChatBox = ({ selectedUser }) => {
  const { name, _id } = useSelector((state) => state.user);
  console.log(selectedUser._id);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [chat, setChat] = useState([]);
  const scrollRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: _id,
        message: message,
        receiver: selectedUser._id,
        members: [_id, selectedUser._id],
      }),
    };

    const response = await fetch("http://localhost:4000/chat", requestOptions);
    const data = await response.json();
    console.log(data);

    if (data) {
      socket.emit("send_message", data.message);
      setMessage("");
    }
  };

  const fetchMsg = async () => {
    try {
      const response = await fetch("http://localhost:4000/chat");

      const data = await response.json();
      // console.log(data);
      if (data) {
        setChat(data.messages);
        // console.log(data.messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  //listen to the event "receiveMessage" emitted by Server
  //useEffect is called whenever a message is received.
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data);
      setMessageReceived(data);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

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
              <p>{selectedUser.name} </p>
            ) : (
              <p>please select a chat </p>
            )}
          </h3>
        </div>
      </div>
      <div className="messageBox">
        <div ref={scrollRef}>
          {chat.length > 0
            ? chat.map((msg) => {
                if (msg.sender === _id) {
                  return (
                    <p className="chatMessage receive" key={msg._id}>
                      <span className="messageName"> </span>
                      {/* {sentMessage} */}
                      {msg.message}
                    </p>
                  );
                } else
                  return (
                    <p className="chatMessage" key={msg._id}>
                      <span className="messageName">{selectedUser.name}</span>
                      {/* {messageReceived} */}
                      {msg.message}
                    </p>
                  );
              })
            : null}
        </div>
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

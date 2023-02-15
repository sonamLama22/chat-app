import React, { useState, useEffect, useRef } from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";
import "../../App.js";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_BASE_URL}`);

socket.on("connect", () => {
  console.log(socket.connnected);
});

socket.on("disconnect", () => {
  console.log(socket.connected); // undefined
});

const ChatBox = ({ selectedUser }) => {
  const { name, _id, token } = useSelector((state) => state.user);
  // console.log("selected userID ->" + selectedUser._id);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [chat, setChat] = useState([]);
  const scrollRef = useRef(null);
  const userID = selectedUser._id;
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect(`${process.env.REACT_APP_BASE_URL}`);
  }, []);

  useEffect(() => {
    socket.current.emit("add user", _id);
    socket.current.on("get users", (users) => {
      console.log(users);
    });
    return () => {
      socket.current.disconnect();
    };
  }, [name]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender: _id,
        message: message,
        members: [_id, userID],
      }),
    };

    socket.current.emit("send message", {
      senderId: _id,
      receiverId: userID,
      msg: message,
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/chat-messages`,
        requestOptions
      );
      const data = await response.json();
      // console.log("response data: " + data);
      if (data) {
        const msg = data.message;
        const backup = [...chat];
        backup.push({
          sender: _id,
          message: msg,
          members: [_id, userID],
        });
        setChat(backup);
        setMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.current.on("receive message", (data) => {
      setMessageReceived({
        sender: data.senderId,
        message: data.msg,
      });
    });
  }, []);

  useEffect(() => {
    messageReceived &&
      selectedUser &&
      setChat((prev) => [...prev, messageReceived]);
  }, [messageReceived, selectedUser]);

  const fetchMsg = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/chat-messages/${userID}/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setChat(data.messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, [selectedUser]);

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
            ? chat.map((msg, index) => {
                if (msg.sender === _id) {
                  return (
                    <p className="chatMessage receive" key={index}>
                      <span className="messageName"> </span>
                      {msg.message}
                    </p>
                  );
                } else
                  return (
                    <p className="chatMessage" key={index}>
                      <span className="messageName">{selectedUser.name}</span>
                      {msg.message}
                    </p>
                  );
              })
            : null}
        </div>
      </div>
      <div className="messageInput">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;

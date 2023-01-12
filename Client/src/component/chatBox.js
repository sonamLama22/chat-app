import React from "react";
import "./chatBox.css";
import { useSelector } from "react-redux";

const ChatBox = ({ selectedUser }) => {
  // const { name } = useSelector((state) => state.username.name);
  // console.log(name);

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
        {/* <p className="chatMessage">
          <span className="messageName">sonam</span>
          this is a message
        </p>
        <p className="chatMessage receive">
          <span className="messageName">jane</span>
          this is a message
        </p> */}
      </div>
      <div className="messageInput">
        <form>
          <input
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
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

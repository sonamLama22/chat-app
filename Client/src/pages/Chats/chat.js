import React from "react";
import SideBar from "../../component/sideBar";
import ChatBox from "../../component/chatBox";
import { useState, useEffect } from "react";
import "./chat.css";

const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/register");
    const data = await response.json();

    if (data) {
      setUserList(data.usersList);
      setSelectedChat(data.usersList.name);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChatChange = (chat) => {
    return setSelectedChat(chat);
  };

  return (
    <div className="chat">
      <div className="chat-body">
        <SideBar userList={userList} changeChat={handleChatChange} />
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
};
export default Chat;

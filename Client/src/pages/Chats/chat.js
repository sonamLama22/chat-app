import React from "react";
import SideBar from "../../component/sideBar";
import ChatBox from "../../component/chatBox";
import { useState, useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";

const Chat = () => {
  // const selectedChat = useSelector((state) => state.chat.selectedChat);
  // console.log(selectedChat);

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/register");
    const data = await response.json();
    console.log(data);
    if (data) {
      setUserList(data.usersList);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="chat">
      <div className="chat-body">
        <SideBar
          userList={userList}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {selectedUser ? <ChatBox selectedUser={selectedUser} /> : <ChatBox />}
      </div>
    </div>
  );
};
export default Chat;

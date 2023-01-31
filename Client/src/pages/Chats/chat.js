import React from "react";
import SideBar from "../../component/sideBar";
import ChatBox from "../../component/chatBox";
import WelcomeBox from "../../component/welcomeBox";
import { useState, useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";

const Chat = () => {
  const { name } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log(selectedUser);
  const handleChatChange = (chat) => {
    console.log(chat);
    setSelectedUser(chat);
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/register");
    const data = await response.json();
    // console.log(data);

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
          changeChat={handleChatChange}
        />
        {selectedUser ? (
          <ChatBox selectedUser={selectedUser} />
        ) : (
          <WelcomeBox />
        )}
      </div>
    </div>
  );
};
export default Chat;

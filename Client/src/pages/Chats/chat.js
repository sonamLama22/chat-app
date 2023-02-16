import React from "react";
import SideBar from "../../component/SideBar/sideBar";
import ChatBox from "../../component/ChatBox/chatBox";
import WelcomeBox from "../../component/WelcomeBox/welcomeBox";
import { useState, useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import NavBar from "../../component/Navbar/navBar";

const Chat = () => {
  const { name } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
<<<<<<< HEAD

  const handleChatChange = (chat) => {
=======
  // console.log(selectedUser);
  const handleChatChange = (chat) => {
    console.log(chat);
>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4
    setSelectedUser(chat);
  };

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`);
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
      <div>
        <NavBar />
      </div>
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

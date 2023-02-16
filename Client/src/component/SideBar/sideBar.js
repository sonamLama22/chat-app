import React, { useEffect } from "react";
import "./sideBar.css";
import { SearchOutlined } from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import ChatBox from "../ChatBox/chatBox";
import { ListItemAvatar } from "@mui/material";
import { useSelector } from "react-redux";

const SideBar = ({ userList, selectedUser, setSelectedUser, changeChat }) => {
  const { name, _id } = useSelector((state) => state.user);
  // console.log(userList);
  // console.log(selectedUser);
  const [selectedChat, setSelectedChat] = useState(undefined);
  // console.log(selectedChat);

  const changeCurrentChat = (item, index) => {
    setSelectedChat(index);
    changeChat(item);
  };
<<<<<<< HEAD:Client/src/component/SideBar/sideBar.js
  // console.log("selected chat" + selectedChat);
  // console.log(changeChat);
=======
>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4:Client/src/component/sideBar.js

  return (
    <div className="sidebar">
      <div className="header">
        {/* <Avatar /> */}
        <h3> contacts </h3>
      </div>
      <div className="search">
        <div className="searchBox">
          <SearchOutlined />
          <input placeholder="search" type="text" />
        </div>
      </div>
      <div className="users">
        {userList.length > 0
          ? userList.map((item, index) => {
              if (item._id === _id) {
                return null;
              } else
                return (
                  <div
                    className={`list ${
                      index === selectedChat ? "selected" : null
                    }`}
                    key={item._id}
                    onClick={() => changeCurrentChat(item, index)}
                  >
                    <ListItemAvatar className="avatar">
                      <Avatar>{item.name[0].toUpperCase()}</Avatar>
                    </ListItemAvatar>

                    <h4>{item.name}</h4>
                  </div>
                );
            })
          : "list not found."}
      </div>
    </div>
  );
};
export default SideBar;

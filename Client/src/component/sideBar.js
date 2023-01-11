import React from "react";
import "./sideBar.css";
import { SearchOutlined } from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";

const SideBar = ({ userList, selectedChat, setSelectedChat }) => {
  return (
    <div className="sidebar">
      <div className="header">
        <Avatar />
        <h3>{selectedChat} </h3>
      </div>
      <div className="search">
        <div className="searchBox">
          <SearchOutlined />
          <input placeholder="search" type="text" />
        </div>
      </div>
      <div className="users">
        {userList.map((item, index) => {
          return (
            <div
              className="list"
              key={index}
              onClick={() => setSelectedChat(item.name)}
            >
              <h3>{item.name.toUpperCase()} </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;

import React, { useEffect } from "react";
import "./sideBar.css";
import { SearchOutlined } from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import ChatBox from "./chatBox";
import { ListItemAvatar } from "@mui/material";

const SideBar = ({ userList, selectedUser, setSelectedUser }) => {
  // console.log(userList);
  // console.log(selectedUser);

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
          ? userList.map((item) => {
              return (
                <div
                  className="list"
                  key={item.name}
                  onClick={() => setSelectedUser(item.name)}
                >
                  <ListItemAvatar className="avatar">
                    <Avatar>{item.name[0].toUpperCase()}</Avatar>
                  </ListItemAvatar>

                  <h3> {item.name} </h3>
                </div>
              );
            })
          : "list not found."}
      </div>
    </div>
  );
};
export default SideBar;

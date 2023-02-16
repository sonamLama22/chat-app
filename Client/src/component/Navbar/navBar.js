import React from "react";
import { FiLogOut } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { resetDetails } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(resetDetails());
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="right">
        <span className="left">{name.toUpperCase()}</span>
        <Tooltip title="Logout">
          <button
            style={{ marginTop: "7px", marginRight: "10px" }}
            onClick={() => logout()}
          >
            <FiLogOut />{" "}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
export default NavBar;

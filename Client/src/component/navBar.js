import React from "react";
import { FiLogOut } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { resetDetails } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(resetDetails());
    navigate("/");
  };
  return (
    <div>
      <Tooltip color="primary" title="Logout">
        <button
          style={{ marginTop: "7px", marginRight: "10px" }}
          onClick={() => logout()}
        >
          <FiLogOut />{" "}
        </button>
      </Tooltip>
    </div>
  );
};
export default NavBar;

import React from "react";
import "./welcomeBox.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../reducers/userSlice";

const WelcomeBox = () => {
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //   dispatch(setUserDetails(data.userDetails));

  return (
    <div className="welcomeBox">
      <div className="welcome">Welcome, {name} please select a chat</div>
    </div>
  );
};
export default WelcomeBox;

import React from "react";
import "./welcomeBox.css";
import { useSelector } from "react-redux";

const WelcomeBox = () => {
  const { name } = useSelector((state) => state.user);

  return (
    <div className="welcomeBox">
      <div className="welcome">Welcome, {name} please select a chat</div>
    </div>
  );
};
export default WelcomeBox;

import React from "react";
import "./welcomeBox.css";
import { useSelector } from "react-redux";

const WelcomeBox = () => {
  const { name } = useSelector((state) => state.user);

  return (
    <>
      <div className="welcomeBox">
        <div className="upper-svg"></div>
        <div className="welcome-msg">
          <h1>Welcome, {name.toUpperCase()} </h1>
          <h2>Please select a chat</h2>
        </div>
      </div>
    </>
  );
};
export default WelcomeBox;

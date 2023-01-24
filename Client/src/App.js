import React from "react";
// import "./App.css";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Chat from "./pages/Chats/chat";
import Error from "./pages/error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
// import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login socket={socket} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/chat" element={<Chat socket={socket} />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;

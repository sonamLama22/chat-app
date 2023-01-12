import React from "react";
// import "./App.css";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Chat from "./pages/Chats/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;

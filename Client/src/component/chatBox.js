// import React, { useEffect } from "react";
// import { Button, Col, Row, Form } from "react-bootstrap";
// import "./chatBox.css";
// import { useSelector, useDispatch } from "react-redux";

// const ChatBox = ({ currentUser }) => {
//   //   const { name } = useSelector((state) => state.username);
//   //   const [userData, setUserData] = useState("");

//   useEffect(() => {
//     const getUserData = async () => {};
//   });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       {/* <div className="bar">{currentUser} </div> */}
//       <div className="message"></div>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={11}>
//             <Form.Group>
//               <Form.Control
//                 type="text"
//                 placeholder="type your message"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col md={1}>
//             <Button variant="primary" type="submit">
//               send
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </>
//   );
// };
// export default ChatBox;
import { SettingsInputAntenna } from "@material-ui/icons";
import React from "react";
import "./chatBox.css";

const ChatBox = ({ selectedChat }) => {
  console.log(selectedChat);
  return (
    <div className="chatbox">
      <div className="chatHeader">
        <div className="username">{/* <h3> {selectedChat.name} </h3> */}</div>
      </div>
      <div className="messageBox">
        <p className="chatMessage">
          <span className="messageName">sonam</span>
          this is a message
        </p>
        <p className="chatMessage receive">
          <span className="messageName">jane</span>
          this is a message
        </p>
      </div>
      <div className="messageInput">
        <form>
          <input
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;

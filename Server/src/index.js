const app = require("express")();
require("dotenv").config();
const port = process.env.PORT;

const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./db/connect");
connect();
app.use(bodyParser.json());
app.use(cors());
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// const connectedUsers = [];

// //adds user to the connectedUsers array
// const addUser = (userId, socketId) => {
//   const user = { userId, socketId };
//   connectedUsers.push(user);
//   console.log("connected users : " + user);
//   return user;
// };

// //finds the userId of connectedUsers
// const getUser = (userId) => {
//   return connectedUsers.find((user) => user.userId === userId);
// };

// //called when user leaves the chat, the user is removed from the array of connectedUsers
// const removeUser = (socketId) => {
//   connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
// };

// //run when a user connects
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("add user", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("get users", connectedUsers);
//   });

//   //send and receive message
//   socket.on("send message", ({ senderId, receiverId, msg }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("receive message", { senderId, msg });
//   });

//   //when user leaves the chat, remove them from array of connectedUsers
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     removeUser(socket.id);
//     io.emit("get users", connectedUsers);
//   });
// });

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const messagesRouter = require("./routes/messagesRouter");

app.use(registerRouter);
app.use(loginRouter);
app.use(messagesRouter);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

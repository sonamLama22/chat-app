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
    origin: "http://localhost:3001",
  },
});

// let users = [];
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log(`A user connected ${socket.id}`);
//   //after every connection take userID and socketID from user
//   socket.on("add-user", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("get-users", users);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     removeUser(socket.id);
//     io.emit("get-users", users);
//   });

//   socket.on("send message", ({ senderId, receiverId, msg }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("receive message", {
//       senderId,
//       msg,
//     });
//   });
// });
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   console.log(`A user connected ${socket.id}`);
//   global.chatSocket = socket;
//   socket.on("add user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send message", (data) => {
//     const userSocket = onlineUsers.get(data.to);
//     if (userSocket) {
//       socket.to(userSocket).emit("receive message", data.msg);
//     }
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
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

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
let connectedUsers = [];

//adds user to the connectedUsers array
const addUser = (userId, socketId) => {
  const user = { userId, socketId };
  connectedUsers.push(user);
  console.log("connected users: ");
  connectedUsers.map((user) => {
    console.log(JSON.stringify(user));
  });
  return user;
};

//finds the userId of connectedUser
const getUser = (userId) => {
  return connectedUsers.find((user) => user.userId === userId);
};

//called when user leaves the chat, the user is removed from the array of connectedUsers
const removeUser = (socketId) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

//run when a user connects
io.on("connection", (socket) => {
  console.log(socket.id + " user connected");
  socket.on("add user", (userId) => {
    addUser(userId, socket.id);
    io.emit("get users", connectedUsers);
  });

  //send and receive message
  socket.on("send message", ({ senderId, receiverId, msg }) => {
    const user = getUser(receiverId);
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("receive message", { senderId, msg });
    } else {
      console.log("selected user is offline");
    }
  });

  //when user leaves the chat, remove them from array of connectedUsers
  socket.on("disconnect", () => {
    console.log(socket.id + " user disconnected");
    removeUser(socket.id);
    io.emit("get users", connectedUsers);
    socket.disconnect();
  });
});

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const messagesRouter = require("./routes/messagesRouter");

app.use(registerRouter);
app.use(loginRouter);
app.use(messagesRouter);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

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

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  //listens to the event called "send_message" from Client and returns some data.
  //a callback function that receives data
  socket.on("send_message", (data) => {
    // console.log(data);
    socket.broadcast.emit("receiveMessage", data); //sends message to all the users except the one that has logged in. This event is listened in the Client side.
  });
});

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
app.use(registerRouter);
app.use(loginRouter);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

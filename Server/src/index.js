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
  //a callback function that receives data/payload
  socket.on("send_message", (data) => {
    console.log(data);
    //send data to all the connected clients.
    socket.broadcast.emit("receive_message", data); //Upon receiving an event we must respond to that event.
    //returns data back to all the users(client) except the one that has logged in. This event is listened in the Client side.
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

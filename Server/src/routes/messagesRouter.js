const { Router } = require("express");
const Messages = require("../models/messages");
const app = Router();

app.get("/chat-messages/:firstid/:secondid", async (req, res) => {
  try {
    const chatMessage = await Messages.find({
      members: { $all: [req.params.firstid, req.params.secondid] },
    });
    if (chatMessage) {
      res.json({
        messages: chatMessage,
      });
    } else {
      res.status(500).send(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/chat-messages", async (req, res) => {
  try {
    const message = await Messages.create(req.body);
    // console.log(req.body);
    if (message) {
      msg: "new message created";
      res.json(message);
    } else {
      res.json({
        msg: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;

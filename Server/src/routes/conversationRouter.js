const { Router } = require("express");
const Conversation = require("../models/conversation");
const app = Router();

app.get("/conversation/:id", async (req, res) => {
  try {
    const chatMessage = await Conversation.find({
      members: { $in: [req.params.id] },
    });

    if (chatMessage) {
      res.json(chatMessage);
    } else {
      res.status(500).send(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/conversation", async (req, res) => {
  try {
    const newChat = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    if (newChat) {
      msg: "new conversation created";
      res.json(newChat);
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

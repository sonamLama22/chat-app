const { Router } = require("express");
const Messages = require("../models/messages");
const app = Router();
<<<<<<< HEAD
const isAuthorized = require("../middleware/isAuthorized");

app.get("/chat-messages/:firstid/:secondid", isAuthorized, async (req, res) => {
  try {
    const chatMessage = await Messages.find({
      members: { $all: [req.params.firstid, req.params.secondid] },
    });
=======

app.get("/chat", async (req, res) => {
  //   console.log(req.body);
  try {
    const chatMessage = await Messages.find();

>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4
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

<<<<<<< HEAD
app.post("/chat-messages", isAuthorized, async (req, res) => {
  try {
    const message = await Messages.create(req.body);
    // console.log(req.body);
=======
app.post("/chat", async (req, res) => {
  try {
    const message = await Messages.create(req.body);
    console.log(req.body);
>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4
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

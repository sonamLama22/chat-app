const { Router } = require("express");
const Messages = require("../models/messages");
const app = Router();

app.get("/chat", async (req, res) => {
  console.log(req.body);
  try {
    const message = await Messages.find();
    if (message) {
      res.json({
        messages: message,
      });
    } else {
      res.status(500).send(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/chat", async (req, res) => {
  try {
    const dbMessage = await Messages.create(req.body);
    console.log(req.body);
    if (dbMessage) {
      res.json({
        msg: "new message created",
      });
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

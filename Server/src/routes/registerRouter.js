const { Router } = require("express");
const Users = require("../models/users");
const app = Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Store hash in your password DB.
    // console.log(hash);
    if (hash) {
      req.body.password = hash;
      const data = await Users.create(req.body);
      console.log(req.body);
      if (data) {
        res.json({
          msg: "user registered",
        });
      } else {
        res.json({
          msg: "something went wrong",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;

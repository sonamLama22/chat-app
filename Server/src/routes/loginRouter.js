const { Router } = require("express");
const Users = require("../models/users");
const app = Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/login", async (req, res) => {
  try {
    // console.log("body is: ", req.body);
    const data = await Users.findOne({ email: req.body.email });
    // console.log("data is: ", data);
    if (data) {
      const { password } = data;
      // console.log(data.password);
      // console.log(password);

      const isValidPassword = bcrypt.compareSync(req.body.password, password);
      // console.log(isValidPassword);
      if (isValidPassword) {
        res.json({
          // userdata: data,
          msg: "login success",
        });
      } else {
        res.json({
          msg: "Password did not match",
        });
      }
    } else {
      res.json({
        msg: "invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;

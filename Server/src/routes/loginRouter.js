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
      const dbPassword = data.password;
      // console.log(data.password);

      const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword);
      // console.log(isValidPassword);
      const { password, __v, ...refactoredData } = data.toObject(); //takes everything except password and __v and stores them in new obj called refactoredData.
      console.log(refactoredData);
      if (isValidPassword) {
        res.json({
          // userdata: data,
          msg: "login success",
          userDetails: refactoredData,
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

app.put("/resetPassword", async (req, res) => {
  try {
    const data = await Users.findOne({ email: req.body.email });
    console.log(data);
    const dbpassword = data.password;
    const isValidPassword = bcrypt.compareSync(req.body.password, dbpassword);
    console.log(isValidPassword);
    if (isValidPassword && req.body.newPassword) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      // Store hash in your password DB.
      // console.log(hash);
      if (hash) {
        data.password = hash;
        const response = await Users.findByIdAndUpdate(data._id, data);
        if (response) {
          res.json({
            msg: "Password updated",
          });
        } else {
          res.json({
            msg: "something went wrong",
          });
        }
      }
    } else {
      res.json({
        msg: "something went wrong.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = app;

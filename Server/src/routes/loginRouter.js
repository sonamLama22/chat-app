const { Router } = require("express");
const Users = require("../models/users");
const app = Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  try {
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    const data = await Users.findOne({ email: req.body.email });
    if (data) {
      const dbPassword = data.password;
      const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword);
<<<<<<< HEAD
      const { password, __v, ...refactoredData } = data.toObject();
      // refactoredData.token = token;
=======
      // console.log(isValidPassword);
      const { password, __v, ...refactoredData } = data.toObject(); //takes everything except password and __v and stores them in new obj called refactoredData.
      console.log(refactoredData);
>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4
      if (isValidPassword) {
        res.status(200).json({
          msg: "login success",
          userDetails: refactoredData,
          token: token,
        });
      } else {
        res.status(500).json({
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

var jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  // verify a token symmetric
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    console.log(decoded);
    if (err) return res.sendStatus(403);
    if (decoded.email) {
      next();
    }
  });
};
module.exports = isAuthorized;

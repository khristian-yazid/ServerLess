const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, "mi-secreto", (err, decoded) => {
    const { _id } = decoded;
    Users.findOne({ _id })
      .exec()
      .then((users) => {
        req.user = user;
        next();
      });
  });
};

const hasRole = (req, res, next) => {
  if (req.user.role === role) {
    netx();
  }
  res.sendStatus(403);
};

module.exports = {
  isAuthenticated,
  hasRole,
};

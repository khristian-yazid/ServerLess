const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { isAuthenticated } = require("../auth/index");

const router = express.Router();

const singToken = (_id) => {
  return jwt.sign({ _id }, "mi-secreto", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, Newsalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      User.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return res.send("usuario ya existente");
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send("Usuario creado con exito");
          });
        });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.send("Usuario o contraseña incorrecta");
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          const token = singToken(user._id);
          return res.send({ token });
        }
        return res.send("usuario o contraseña incorrectos");
      });
    });
});

router.get("/me", isAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = router;

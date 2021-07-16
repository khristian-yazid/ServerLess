const express = require("express");
const crypto = require("crypto");
const Users = require("../models/Users");

const router = express.Router();

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
  const { email, body } = req.body;
  Users.findOne({ email })
    .exec()
    .then((users) => {
      if (!user) {
        return res.send("Usuario o contraseña incorrecta");
      }
      crypto.pbkdf2(password, Newsalt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token });
        }
        return res.send("usuario o contraseña incorrectos");
      });
    });
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const meals = require("./routes/meals");
const orders = require("./routes/orders");

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/meals", meals);
app.use("/api/orders", orders);
app.use("/api/auth", auth);

module.exports = app;

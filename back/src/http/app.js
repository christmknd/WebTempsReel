const express = require("express");
const cors = require("cors");
const db = require("./database.js");

require("dotenv").config();

const userRouter = require("./user/user.routes.js");
const isAuthenticated = require("./middlewares/auth.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", isAuthenticated, (req, res) => {
  res.json("Hello world !");
});

app.get("/message", (req, res) => {
  res.json({ message: "MyMessage" });
});

app.use("/users", userRouter);

module.exports = app;

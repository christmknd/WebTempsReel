const express = require("express");
const cors = require("cors");
const db = require("./database.js");
const { EventEmitter } = require("events");

const { getFreeSLots } = require("../utils.js");

require("dotenv").config();

const userRouter = require("./user/user.routes.js");

const isAuthenticated = require("./middlewares/auth.js");
const appointmentRouter = require("./appointment/appointment.routes.js");
const messageRouter = require("./Message/message.routes.js");
const { text } = require("express");

// SSE
const usersEvent = new EventEmitter();

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

app.post("/annonce-commerciale", (req, res) => {
  usersEvent.emit("update", req.body.data);
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  usersEvent.on("update", (text) => {
    res.write(`event: offrecommerciale\ndata: ${text}\n\n`);
  });
});

app.use("/messages", messageRouter);

app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);

module.exports = app;

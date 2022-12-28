const express = require("express");
const messageRouter = express.Router();

const messageController = require("./message.controller.js");

messageRouter.get("/", messageController.findMessages);
// userRouter.post("/", userController.addUser);
// userRouter.get("/:id", userController.findUserById);
// userRouter.put("/:id", userController.updateUser);
// userRouter.delete("/:id", userController.deleteById);
// userRouter.post("/login", userController.login);
// userRouter.post("/signup", userController.signup);
module.exports = messageRouter;

const express = require("express");
const roomRouter = express.Router();

const roomController = require("./room.controller.js");
roomRouter.get("/", roomController.findAll);
roomRouter.post("/", roomController.addRoom);
roomRouter.get("/:id", roomController.findRoomById);
roomRouter.put("/:id", roomController.updateRoom);
roomRouter.delete("/:id", roomController.deleteById);

module.exports = roomRouter;

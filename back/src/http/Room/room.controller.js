const roomService = require("./room.service.js");

function findAll(req, res) {
  roomService
    .findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
      console.log(error);
    });
}

function addRoom(req, res) {
  roomService
    .addRoom(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
      console.log(error);
    });
}

function findRoomById(req, res) {
  roomService
    .findRoomById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
      console.log(error);
    });
}

function updateRoom(req, res) {
  roomService
    .updateRoom(req.params.id,req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
      console.log(error);
    });
}

function deleteById(req, res) {
  roomService
    .deleteById(req.params.id)
    .then(() => {
      res.status(204).send("Room deleted successfully");
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
      console.log(error);
    });
}

const messagesController = {
  findMessages,
};

module.exports = messagesController;

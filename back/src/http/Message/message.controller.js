const messageService = require("./message.service.js");
const dotenv = require("dotenv");

function findMessages(req, res) {
  messageService
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

const messagesController = {
  findMessages,
};

module.exports = messagesController;

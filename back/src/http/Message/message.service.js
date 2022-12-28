const db = require("../database");
const Message = db.messages;

async function findAll() {
  const reponse = await Message.findAll();
  return reponse;
}

async function findById(id) {
  const response = await Message.findByPk(id);
  return response;
}

function deleteById(id) {
  return Message.destroy({ where: { id: id } });
}

async function create(message) {
  const newMessage = new Message(message);
  const response = await newMessage.save();
  return response;
}

const messageService = {
  findAll,
  create,
  findById,
  deleteById,
};

module.exports = messageService;

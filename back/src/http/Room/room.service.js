const db = require("../database");
const Room = db.rooms;

async function findAll() {
  const reponse = await Room.findAll();
  return reponse;
}

async function addRoom(room) {
  const response = await Room.create(room);
  return response;
}

async function findRoomById(id) {
  const response = await Room.findByPk(id);
  return response;
}

async function updateRoom(id, room) {
  var updateRoom = {
    ...(room.name && { name: room.name }),
    ...(room.maxUsers && { maxUsers: room.maxUsers }),
    ...(room.socketID && { socketID: room.socketID }),
  };
  return await Room.update(updateRoom, {
    where: { id: id },
  });
}

async function deleteById(id) {
  return await Room.destroy({
    where: { id: id },
  });
}

const roomService = {
  findAll,
  addRoom,
  findRoomById,
  updateRoom,
  deleteById,
};
module.exports = roomService;

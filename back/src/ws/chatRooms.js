const CUSTOM_ROOM_PREFIX = "custom:";
const getUser = require("./auth");
module.exports = (io, socket) => {
  const getAllRooms = async () => {
    let rooms = io.sockets.adapter.rooms;
    let res = [];
    for (let [key, value] of rooms) {
      if (key.startsWith(CUSTOM_ROOM_PREFIX)) {
        res.push({
          name: key.replace(CUSTOM_ROOM_PREFIX, ""),
          usersNumber: io.sockets.adapter.rooms.get(key).size-1,
          maxUsers: value.maxUsers,
        });
      }
    }
    return res;
  };

  const updateRooms = async () => {
    const allRooms = await getAllRooms();
    io.emit("rooms", allRooms);
  };

  const roomTransfer = async (oldName, newName, maxUsers) => {
    if (!newName) {
      let targetRoom = io.sockets.adapter.rooms.get(
        CUSTOM_ROOM_PREFIX + oldName
      );
      targetRoom.maxUsers = maxUsers;
      return;
    }
    const clients = io.sockets.adapter.rooms.get(CUSTOM_ROOM_PREFIX + oldName);
    io.to(CUSTOM_ROOM_PREFIX + oldName).emit("room-transfer", {
      action: "transfer",
      newRoom: newName,
    });
    clients.forEach((client) => {
      const clientSocket = io.sockets.sockets.get(client);
      clientSocket.leave(CUSTOM_ROOM_PREFIX + oldName);
      clientSocket.join(CUSTOM_ROOM_PREFIX + newName);
    });
    let transferedRoom = io.sockets.adapter.rooms.get(
      CUSTOM_ROOM_PREFIX + newName
    );
    transferedRoom.maxUsers = maxUsers;
  };

  socket.on("add-room", async (data) => {
    socket.join(CUSTOM_ROOM_PREFIX + data.name);
    let createdRoom = io.sockets.adapter.rooms.get(
      CUSTOM_ROOM_PREFIX + data.name
    );
    createdRoom.maxUsers = data.maxUsers;
    updateRooms();
  });

  socket.on("update-room", async (data) => {
    roomTransfer(data.name, data.newName, data.maxUsers);
    updateRooms();
  });

  socket.on("delete-room", async (data) => {
    io.to(CUSTOM_ROOM_PREFIX + data).emit("room-delete");
    io.in(CUSTOM_ROOM_PREFIX + data).socketsLeave(CUSTOM_ROOM_PREFIX + data);
    updateRooms();
  });

  socket.on("get-rooms", async (data) => {
    updateRooms();
  });

  socket.on("join-room", async (data) => {
    console.log(data)
    let targetRoom = io.sockets.adapter.rooms.get(CUSTOM_ROOM_PREFIX + data.room);
    // console.log("SIZE",io.of('/').in(CUSTOM_ROOM_PREFIX+data.name).clients())
    console.log("SIZE", targetRoom.size)
    console.log("MAX", targetRoom.maxUsers)
    if (targetRoom.size <= targetRoom.maxUsers) {
      socket.join(CUSTOM_ROOM_PREFIX + data.room);
      socket.emit("joined-room", data.room);
      const user = await getUser(data.token);
      const username = user ? user.username : "anonymous";
      io.to(CUSTOM_ROOM_PREFIX + data.room).emit("room-event", {
        username,
        action: "joined",
      });
      updateRooms();
    } else {
      socket.emit("error-message", "Room is full");
    }
  });

  socket.on("leave-room", async (data) => {
    const user = await getUser(data.token);
    const username = user ? user.username : "anonymous";
    socket.leave(CUSTOM_ROOM_PREFIX + data.room);
    io.to(CUSTOM_ROOM_PREFIX + data.room).emit("room-event", {
      username,
      action: "left",
    });
    updateRooms();
  });

  socket.on("message", async (data) => {
    const user = await getUser(data.token);
    const username = user ? user.username : "anonymous";
    const message = {
      content: data.content,
      sender: username,
      date: new Date(),
    };
    io.to(CUSTOM_ROOM_PREFIX + data.room).emit("new-message", message);
  });

  socket.on("clean-rooms", async () => {
    let rooms = io.sockets.adapter.rooms;
    //delete all custom rooms
    for (let [key, value] of rooms) {
      if (key.startsWith(CUSTOM_ROOM_PREFIX)) {
        rooms.delete(key);
      }
    }
  });

  socket.on("disconnect", async () => {
    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
    updateRooms();
  });
};

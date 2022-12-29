module.exports = (io, socket) => {
  const demandSav = async (username) => {
    socket.join("room_wait_sav");
    const sockets = await io.in("room_wait_sav").fetchSockets();
    socket.broadcast.emit("sav:demand", sockets.length);
    socket.emit("sav:demand", sockets.length);
    socket.broadcast.emit("sav:admin:demand", {
      user: { username, id: socket.id },
      number_wait: sockets.length,
    });
  };

  const onlineAdminSav = async () => {
    const sockets = await io.in("room_admin_online").fetchSockets();
    socket.emit("sav:admin:count", sockets.length);
  };

  const newAdminOnlineSav = async (online) => {
    if (!online) {
      socket.join("room_admin_online");
    } else socket.leave("room_admin_online");
    const sockets = await io.in("room_admin_online").fetchSockets();
    socket.broadcast.emit("sav:admin:count", sockets.length);
  };

  const acceptSavAdmin = (idUser) => {
    socket.to(idUser).emit("sav:accept", { idAdmin: socket.id });
  };

  const sendMessage = (idUserToSend, message) => {
    socket.to(idUserToSend).emit("send:message", socket.id, message);
  };

  socket.on("sav:demand", demandSav);
  socket.on("sav:admin:count", onlineAdminSav);
  socket.on("sav:admin:new", newAdminOnlineSav);
  socket.on("sav:admin:accept", acceptSavAdmin);
  socket.on("send:message", sendMessage);
};

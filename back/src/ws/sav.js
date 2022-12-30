module.exports = (io, socket) => {
  // Nouvelle demande User
  // OU demande décliné
  const demandSav = async (bool, username) => {
    // Demande réalisé
    if (bool) {
      socket.join("room_wait_sav");
    } // Demande décliné
    else socket.leave("room_wait_sav");
    const sockets = await io.in("room_wait_sav").fetchSockets();
    io.emit("sav:demand:count", sockets.length);
    io.emit("sav:admin:demand:user", { username, id: socket.id });
  };

  // Nombre Admin online
  const onlineAdminSav = async () => {
    const sockets = await io.in("room_admin_online").fetchSockets();
    socket.emit("sav:admin:count", sockets.length);
  };

  // Nouveau Admin online
  const newAdminOnlineSav = async (online) => {
    if (!online) {
      socket.join("room_admin_online");
    } else socket.leave("room_admin_online");
    const sockets = await io.in("room_admin_online").fetchSockets();
    io.emit("sav:admin:count", sockets.length);
  };

  // Demande accepté par Admin
  const acceptSavAdmin = (idUser) => {
    socket.to(idUser).emit("sav:reponse", socket.id);
  };

  // Demande décliné par Admin
  const declineSavAdmin = (idUser) => {
    socket.to(idUser).emit("sav:reponse");
  };

  const sendMessage = (idUserToSend, message) => {
    socket.to(idUserToSend).emit("send:message", socket.id, message);
  };

  socket.on("sav:demand", demandSav);
  socket.on("sav:admin:count", onlineAdminSav);
  socket.on("sav:admin:new", newAdminOnlineSav);
  socket.on("sav:admin:accept", acceptSavAdmin);
  socket.on("sav:admin:decline", declineSavAdmin);
  socket.on("send:message", sendMessage);
};

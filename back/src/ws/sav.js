module.exports = (io, socket) => {
  const demandSav = async () => {
    socket.join("room_wait_sav");
    const sockets = await io.in("room_wait_sav").fetchSockets();
    socket.broadcast.emit("sav:demand", sockets.length);
    socket.emit("sav:demand", sockets.length);
  };

  const onlineAdminSav = async () => {
    const sockets = await io.in("room_admin_online").fetchSockets();
    socket.emit("sav:admin:count", sockets.length);
  };

  const newAdminOnlineSav = async () => {
    const sockets = await io.in("room_admin_online").fetchSockets();
    socket.broadcast.emit("sav:admin:new", sockets.length);
  };

  // TODO
  // const acceptSav = async (idAdmin) => {
  //   socket.emit("return_demande_sav", idAdmin);
  // };

  socket.on("sav:demand", demandSav);
  socket.on("sav:admin:count", onlineAdminSav);
  socket.on("sav:admin:new", newAdminOnlineSav);
  // TOOD
  // socket.on("sav:accept", acceptSav);
};

const messageService = require("../http/Message/message.service");
const getUser = require("./auth");
module.exports = (io, socket) => {
  socket.on("private-chat", async (data) => {
    console.log("private-chat", data);
    const user = await getUser(data.token);
    const username = user ? user.username : "anonymous";
    socket.join(username + ":" + data.receiver);
    socket.join(data.receiver + ":" + username);
    console.log("subscribed to private chat", username + ":" + data.receiver);
  });

  socket.on("private-message", async (data) => {
    const user = await getUser(data.token);
    const username = user ? user.username : "anonymous";
    const message = {
      content: data.content,
      sender: username,
      receiver: data.receiver,
      date: new Date(),
    };
    const messageResponse = await messageService.create(message);
    io.to(username + ":" + data.receiver).emit(
      "new-private-message",
      messageResponse
    );
    io.to(data.receiver + ":" + username).emit(
      "new-private-message",
      messageResponse
    );
    console.log("messageResponse", messageResponse);
    console.log("message", message);
  });
};

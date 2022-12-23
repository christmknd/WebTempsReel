const fnWSChatbot = require("./chatbot");

function OnConnection(socket) {
  console.log(`user connected ${socket.id}`);
  fnWSChatbot.initChatbot(socket);
  fnWSChatbot.responseChatbot(socket)
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}

const fnWS = { OnConnection };

module.exports = fnWS;

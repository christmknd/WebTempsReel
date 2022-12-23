function initChatbot(socket) {
  socket.on("init_chatbot", () => {
    socket.emit("init_chatbot", types_aide);
  });
}

function responseChatbot(socket) {
  socket.on("response_chatbot", (id) => {
    if (id === 1) {
      socket.emit("date_dernier_entretien", [
        { id: 11, question: "Date du dernier entretien de la moto" },
      ]);
    }
  });
}

function closeChatbot(socket) {
  socket.on("close_chatbot", () => {
    socket.emit("close_chatbot", { id: 00, question: "Merci et au revoir !" });
  });
}

const types_aide = [
  { id: 1, question: "Vérifier l’entretien de son véhicule" },
  { id: 2, question: "Informations sur les véhicules" },
  { id: 3, question: "Informations de contact" },
  { id: 0, question: "Arrêter le workflow" },
];

const fnWSChatbot = { initChatbot, closeChatbot, responseChatbot };

module.exports = fnWSChatbot;

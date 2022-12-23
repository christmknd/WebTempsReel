function initChatbot(socket) {
  socket.on("init_chatbot", () => {
    socket.emit("init_question", types_aide);
  });
}

function responseChatbot(socket) {
  socket.on("response_chatbot", (id) => {
    if (id === 1) {
      socket.emit("init_question", [
        { id: 11, question: "Date du dernier entretien de la moto" },
      ]);
    } else if (id === 2) {
      socket.emit("init_question", [
        { id: 11, question: "Date du dernier entretien de la moto" },
      ]);
    } else if (id === 3) {
      socket.emit("init_question", infos_contact);
    } else if (id === 31) {
      socket.emit("resp_contact", {resp : resp_contact[0], question: types_aide.slice(-1)});
    } else if (id === 32) {
      socket.emit("resp_contact", {resp : resp_contact[1], question: types_aide.slice(-1)});
    } else
      socket.emit("close_chatbot", {
        id: 00,
        question: "Merci et au revoir !",
      });
  });
}

const types_aide = [
  { id: 1, question: "Vérifier l’entretien de son véhicule" },
  { id: 2, question: "Informations sur les véhicules" },
  { id: 3, question: "Informations de contact" },
  { id: 0, question: "Arrêter le workflow" },
];

const infos_contact = [
  { id: 31, question: "Par Email" },
  { id: 32, question: "Par Téléphone" },
];

const resp_contact = [
  { id: 310, question: "test@gmail.com" },
  { id: 320, question: "0611223344" },
];

const fnWSChatbot = { initChatbot, responseChatbot };

module.exports = fnWSChatbot;

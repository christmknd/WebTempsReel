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
    } else if (id === 12) {
      socket.emit("init_question", [
        {
          id: 121,
          question:
            "disponibilité pour la semaine en cours TODO",
        },
      ]);
    } else if (id === 13) {
      socket.emit("init_question", [
        {
          id: 131,
          question:
            "le nombre de kilomètres parcourus depuis le dernier entretien TODO",
        },
      ]);
    } else if (id === 2) {
      socket.emit("init_question", types_usage);
    } else if (id === 21 || id === 22 || id === 23) {
      socket.emit("init_question", [
        { id: 20, question: "Proposition RDV TODO" },
      ]);
    } else if (id === 3) {
      socket.emit("init_question", infos_contact);
    } else if (id === 31) {
      socket.emit("resp_contact", {
        resp: resp_contact[0],
        question: types_aide.slice(-1),
      });
    } else if (id === 32) {
      socket.emit("resp_contact", {
        resp: resp_contact[1],
        question: types_aide.slice(-1),
      });
    } else
      socket.emit("close_chatbot", {
        id: 01,
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

const types_usage = [
  { id: 21, question: "Usage routier" },
  { id: 22, question: "Usage tout-terrain" },
  { id: 23, question: "Usage sportif" },
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

function initChatbot(socket) {
  socket.on("init_chatbot", () => {
    socket.emit("init_question", types_aide);
  });
}

function responseChatbot(socket) {
  socket.on("response_chatbot", (id) => {
    if (id === 1) {
      socket.emit("init_question", [
        { id: 11, text: "Date du dernier entretien de la moto" },
      ]);
    } else if (id === 12) {
      socket.emit("init_question", [
        {
          id: 121,
          text: "disponibilité pour la semaine en cours TODO",
        },
      ]);
    } else if (id === 13) {
      socket.emit("init_question", [
        {
          id: 130,
          text: "le nombre de kilomètres parcourus depuis le dernier entretien",
        },
      ]);
    } else if (id === 132) {
      socket.emit("init_question", [
        {
          id: 12,
          text: "réviser le véhicule",
        },
        {
          id: 1322,
          text: "ne pas réviser le véhicule",
        },
      ]);
    } else if (id === 2) {
      socket.emit("init_question", types_usage);
    } else if (id === 21 || id === 22 || id === 23) {
      socket.emit("init_question", [{ id: 20, text: "Proposition RDV TODO" }]);
    } else if (id === 3) {
      socket.emit("init_question", infos_contact);
    } else if (id === 31) {
      setTimeout(() => {
        socket.emit("resp_contact", {
          resp: resp_contact[0],
          text: types_aide.slice(-1),
        });
      }, 1000);
    } else if (id === 32) {
      setTimeout(() => {
        socket.emit("resp_contact", {
          resp: resp_contact[1],
          text: types_aide.slice(-1),
        });
      }, 1000);
    } else
      socket.emit("close_chatbot", {
        id: 01,
        text: "Merci et au revoir !",
      });
  });
}

const types_aide = [
  { id: 1, text: "Vérifier l’entretien de son véhicule" },
  { id: 2, text: "Informations sur les véhicules" },
  { id: 3, text: "Informations de contact" },
  { id: 0, text: "Arrêter le workflow" },
];

const types_usage = [
  { id: 21, text: "Usage routier" },
  { id: 22, text: "Usage tout-terrain" },
  { id: 23, text: "Usage sportif" },
];

const infos_contact = [
  { id: 31, text: "Par Email" },
  { id: 32, text: "Par Téléphone" },
];

const resp_contact = [
  { id: 310, text: "test@gmail.com" },
  { id: 320, text: "0611223344" },
];

const fnWSChatbot = { initChatbot, responseChatbot };

module.exports = fnWSChatbot;

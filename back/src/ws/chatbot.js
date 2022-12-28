const { getFreeSLots } = require("../utils");
const appointmentService = require("../http/appointment/appointment.service");

module.exports = (io, socket) => {
  const initQuestions = () => {
    socket.emit("chatbot:questions", types_aide);
  };
  const responseQuestions = (id) => {
    if (id === 1) {
      socket.emit("chatbot:questions", [
        { id: 11, text: "Date du dernier entretien de la moto" },
      ]);
    } else if (id === 12) {
      getFreeSLots().then((slots) => {
        const propositions = slots["Entretien"].map((date) => {
          return {
            id: "overhaul_apt_" + date,
            text: date,
          };
        });
        socket.emit("chatbot:questions", propositions);
      });
    } else if (id === 13) {
      socket.emit("chatbot:questions", [
        {
          id: 130,
          text: "le nombre de kilomètres parcourus depuis le dernier entretien",
        },
      ]);
    } else if (id === 132) {
      socket.emit("chatbot:questions", [
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
      socket.emit("chatbot:questions", types_usage);
    } else if (id === 21 || id === 22 || id === 23) {
      getFreeSLots().then((slots) => {
        // console.log(slots);
        let type = "";
        switch (id) {
          case 21:
            type = "Routier";
            break;
          case 22:
            type = "Tout-Terrain";
            break;
          case 23:
            type = "Sportif";
        }
        const propositions = slots[type].map((date) => {
          return {
            id: "information_apt_" + type + "_" + date,
            text: date,
          };
        });
        socket.emit("chatbot:questions", propositions);
      });
    } else if (id === 3) {
      socket.emit("chatbot:questions", infos_contact);
    } else if (id === 31) {
      setTimeout(() => {
        socket.emit("chatbot:reponses:contact", {
          resp: resp_contact[0],
          text: types_aide.slice(-1),
        });
      }, 1000);
    } else if (id === 32) {
      setTimeout(() => {
        socket.emit("chatbot:reponses:contact", {
          resp: resp_contact[1],
          text: types_aide.slice(-1),
        });
      }, 1000);
    }
    ///// APPOINTMENT PART ///////
    else if (id && id.includes("information_apt")) {
      appointmentService.create({
        type: id.split("_")[2],
        date: id.split("_")[3],
      });
      socket.emit("chatbot:close", {
        id: 01,
        text: "Votre rendez-vous a bien été pris. Merci et au revoir !",
      });
    } else if (id && id.includes("overhaul_apt")) {
      appointmentService.create({
        type: "Entretien",
        date: id.split("_")[2],
      });
      socket.emit("chatbot:close", {
        id: 01,
        text: "Votre rendez-vous a bien été pris. Merci et au revoir !",
      });
    } else {
      socket.emit("chatbot:close", {
        id: 01,
        text: "Merci et au revoir !",
      });
    }
  };
  socket.on("chatbot:questions", initQuestions);
  socket.on("chatbot:reponses", responseQuestions);
};

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

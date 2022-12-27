module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    date: Sequelize.DATEONLY,
    type: {
      type: Sequelize.ENUM,
      values: ["Routier", "Tout-Terrain", "Sportif","Entretien"],
      validate:{
        isIn: {
          args: [["Routier", "Tout-Terrain", "Sportif","Entretien"]],
          msg: "Le type doit être Routier, Tout-Terrain, Sportif ou Entretien"
        }
      }
    },
    status: {
      type: Sequelize.ENUM,
      values: ["En attente", "Terminé", "Annulé"],
      defaultValue: "En attente",
    }
  });

  return Appointment;
};
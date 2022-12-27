const Appointment = require("../appointment/appointment.model");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    role: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  // User.hasMany(Appointment,{
  //   foreignKey: 'userId',
  //   as: 'appointments'
  // });
  // User.associate = () => {
  //   User.hasMany(Appointment,{
  //     foreignKey: 'userId',
  //     as: 'appointments'
  //   });
  // }


  return User;
};

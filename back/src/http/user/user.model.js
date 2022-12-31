const Appointment = require("../appointment/appointment.model");
const Roles = require('../enum/roles.enum')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    role: {
      type: Sequelize.ENUM(Roles.User, Roles.Admin),
      defaultValue: Roles.User,
    },
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

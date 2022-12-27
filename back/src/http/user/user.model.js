module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    role: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  return User;
};

module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    name: Sequelize.STRING,
    maxUsers: Sequelize.INTEGER,
    socketID: Sequelize.STRING,
  });

  return Room;
};

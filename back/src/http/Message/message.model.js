module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    content: Sequelize.STRING,
    sender: Sequelize.STRING,
    receiver: Sequelize.STRING,
    date: Sequelize.DATE,
  });

  return Message;
};

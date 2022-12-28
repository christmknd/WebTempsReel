const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user/user.model.js")(sequelize, Sequelize);
db.appointments = require("./appointment/appointment.model.js")(
  sequelize,
  Sequelize
);
db.messages = require("./Message/message.model.js")(sequelize, Sequelize);

module.exports = db;

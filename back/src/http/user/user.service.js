const db = require("../database");
const User = db.users;

async function findAll() {
  const reponse = await User.findAll();
  return reponse;
}

function findById(id) {
  return User.findByPk(id);
}

async function findByUsername(username) {
  const response = await User.findOne({ where: { username: username } });
  return response;
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

async function create(user) {
  const newUser = new User(user);
  const response = await newUser.save();
  return response;
}

function update(user, id) {
  var updateUser = {
    title: user.title,
    technologies: user.technologies,
    description: user.description,
    budget: user.budget,
    contact_email: user.contact_email,
  };
  return User.update(updateUser, { where: { id: id } });
}

const userService = {
  findAll,
  create,
  findById,
  deleteById,
  update,
  findByUsername,
};

module.exports = userService;

const db = require("../database");
const User = db.users;

function findAll() {
    return User.findAll();
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(user) {
    var newUser = new User(user);
    return newUser.save();
}

function update(user, id) {
    var updateUser = {
        title: user.title,
        technologies: user.technologies,
        description: user.description,
        budget: user.budget,
        contact_email: user.contact_email
    };
    return User.update(updateUser, { where: { id: id } });
}

const userService = {
    findAll,
    create,
    findById,
    deleteById,
    update
}

module.exports = userService;
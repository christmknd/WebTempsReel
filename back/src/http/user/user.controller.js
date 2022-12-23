const userService = require("./user.service.js");

function addUser(req, res) {
    let user = req.body;
    console.log('addUser');
    userService.create(user).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserById(req, res) {
    console.log('findUserById');
    userService.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    console.log('deleteById');
    userService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUser(req, res) {
    console.log('updateUser');
    userService.updateUser(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUsers(req, res) {
    console.log('findUsers');
    userService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const userController = {
    addUser,
    findUsers,
    findUserById,
    updateUser,
    deleteById
}

module.exports = userController;
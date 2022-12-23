const express = require('express');
const userRouter = express.Router();

const userController = require("./user.controller.js");

userRouter.post('/', userController.addUser);
userRouter.get('/', userController.findUsers);
userRouter.get('/:id', userController.findUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteById);

module.exports = userRouter;


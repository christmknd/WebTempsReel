import express from 'express';
const userRouter = express.Router();

import userController from "./user.controller.js";

userRouter.post('/', userController.addUser);
userRouter.get('/', userController.findUsers);
userRouter.get('/:id', userController.findUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteById);

export default userRouter;


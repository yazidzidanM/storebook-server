import express from "express"
import * as userController from "./user.controller"
import { Authentication } from "#middlewares/authentication";
import { Authorization } from "#middlewares/authorization";
const userRouter = express.Router();

userRouter.use(Authentication); 

userRouter.get("/", Authorization("admin"), userController.getAllUsers)
userRouter.put("/:id", userController.updateUser)

export default userRouter
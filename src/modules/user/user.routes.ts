import express from "express"
import * as userController from "./user.controller"
import { Authentication } from "#middlewares/authentication";
const userRouter = express.Router();

userRouter.use(Authentication); 

userRouter.get("/", userController.getAllUsers)

export default userRouter
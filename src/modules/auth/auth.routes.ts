import express from "express";
import * as authController from "./auth.controller";
import { Authentication } from "#middlewares/authentication";
const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/logout", Authentication, authController.logout);

authRouter.post("/refresh", Authentication, authController.refreshToken);

export default authRouter;

import { Request, Response, NextFunction } from "express";
import * as AuthService from "./auth.service"
import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await AuthService.register(req.body);
  sendResponse(res, {}, "user successfully created", 201);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await AuthService.login(req.body.username, req.body.password);
  sendResponse(res, {}, "user successfully logged in", 200);
})

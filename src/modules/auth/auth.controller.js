import * as AuthService from "./auth.service.js"
import catchAsync from "#shared/catchAsync";
import { sendResponse } from "#shared/utils/response";

export const register = catchAsync(async (req, res, next) => {
  await AuthService.register(req.body);
  sendResponse(res, {}, "user successfully created", 201);
});

export const login = catchAsync(async (req, res, next) => {
  await AuthService.login(req.body.username, req.body.password);
  sendResponse(res, {}, "user successfully logged in", 200);
})

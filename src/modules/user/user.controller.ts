import { Request, Response, NextFunction } from "express";
import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import { UserRepository } from "./user.repository";
import UserServices from "./user.service";

const userService = new UserServices(new UserRepository());

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUsers();
    sendResponse(res, result, "users fetched successfully", 200);
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paramsId = req.params.id;
    const result = await userService.updateUserById(
      paramsId,
      req.body.name,
      req.body.username,
      req.body.phone,
      req.body.address
    );
    sendResponse(res, result, "user successfully updated", 200);
  }
);

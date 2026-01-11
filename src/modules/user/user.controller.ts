import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import { UserRepository } from "./user.repository";
import UserServices from "./user.service";

const userService = new UserServices(new UserRepository())

export const getAllUsers = catchAsync(
  async (req: any, res: any, next: any) => {
    const result = await userService.getAllUsers();
    sendResponse(res, result, "users fetched successfully", 200);
  }
)
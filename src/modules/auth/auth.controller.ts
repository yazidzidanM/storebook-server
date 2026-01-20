import { Request, Response, NextFunction } from "express";
import AuthServices from "./auth.service";
import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import { UserRepository } from "#modules/user/user.repository";
import { AuthRepository } from "./auth.repository";
import { CartRepository } from "#modules/cart/cart.repository";
import { CartItemsRepository } from "#modules/cart_items/cart_items.repository";

const AuthService = new AuthServices(
  new UserRepository(),
  new AuthRepository(),
  new CartRepository(),
  new CartItemsRepository()
);

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.registerUser(
      req.body.name,
      req.body.username,
      req.body.password
    );
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: "/api/auth/refresh", 
    });
    sendResponse(res, {user: result.user, cartId: result.cart_id, access_token: result.accessToken}, "user successfully created", 201);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.login(
      req.body.username,
      req.body.password,
    );
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: "/api/auth/refresh", 
    });
    sendResponse(res, {user: result.user, cartId: result.cart_id, access_token: result.accessToken}, "user successfully logged in", 200);
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.logout(req.cookies.refreshToken);
    sendResponse(res, result, "user successfully logged out", 200);
  }
);

export const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.refreshSession(req.cookies.refreshToken);
    console.log(req.cookies.refreshToken)
    sendResponse(res, result, "access token generated successfully", 200);
  }
);

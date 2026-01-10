import { Response, NextFunction } from "express";
import { AuthRequest } from "./authentication";
import ExptectedError from "#shared/errors/errorHandler";

export const Authorization = (allowedRoles: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new ExptectedError("Unauthorized", 401);
    if (!allowedRoles.includes(req.user.role)) throw new ExptectedError("Forbidden", 403);
    next();
  };
};

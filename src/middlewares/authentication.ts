import { verifyAccessToken } from "#shared/helpers/jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ExptectedError from "#shared/errors/errorHandler";

// export interface AuthRequest extends Request {
//   user?: {
//     id: number;
//     role: string;
//   };
// }


export const Authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new ExptectedError("token not provide", 401);

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

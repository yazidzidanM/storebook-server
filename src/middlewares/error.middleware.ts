import { Request, Response, NextFunction } from "express";
import { sendError } from "#shared/utils/response";
import env from "../env.js";

interface ExtendedError extends Error {
  statusCode?: number;
  path?: string | null;
  method?: string;
  ip?: string | null;
}

const globalErrorHandler = (
  err: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  err.path = req.path || null;
  err.method = req.method || "*";
  err.ip = req.ip || null;

  if (env.NODE_ENV === "development")
    console.error("ERROR FROM", err);

  sendError(
    res,
    message,
    statusCode,
    env.NODE_ENV === "development" ? err.stack : null
  );
};

export default globalErrorHandler;

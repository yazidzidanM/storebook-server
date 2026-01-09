// src/middleware/error.middleware.js
import { sendError } from "#shared/utils/response";
import env from "../env.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  err.path = req.path || null;
  err.method = req.method || "*";
  err.ip = req.ip || null;

  console.log(env.NODE_ENV)

  if(env.NODE_ENV === "development") console.error("ERROR COMING UP: FROM", err);

  sendError(
    res,
    message,
    statusCode,
    env.NODE_ENV === "development" ? err.stack : null
  );
};

export default globalErrorHandler;

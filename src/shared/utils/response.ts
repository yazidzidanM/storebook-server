import { Response } from "express";

export const sendResponse = (
  res: Response,
  data: any,
  message: string,
  statusCode: number
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number,
  stack: any
) => {
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: stack,
  });
};

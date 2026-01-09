export const sendResponse = (res, data, message, statusCode) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data
  })
};

export const sendError = (res, message, statusCode, stack) => {
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: stack
  })
};
const ErrorHandler = require("../utils/errorHandler");

exports.notFound = (req, res, next) => {
  return next(new ErrorHandler(`Resource Not Found. ${req.originalUrl}`, 404));
};

exports.errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
  });
};

import { NextFunction, Response, Request } from "express";
import { ValidationError } from "express-validation";
import logger from "../common/logger/logger";
import { AppError } from "../common/utils/error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    logger.error({
      name: err.name,
      message: err.message,
      error: err.details,
      statusCode: err.statusCode,
      __filename,
    });
    res.status(500).json(err);
  } else if (err instanceof AppError) {
    const response = {
      name: err.name,
      message: err.message,
      status: err.statusCode,
      // stack:err.stack,
    };

    logger.error({
      message: err.message,
      error: err,
      name: err.name,
      statusCode: err.statusCode,
      __filename,
    });
    res.status(err.statusCode);
    res.json(response);
  } else {
    const response = {
      name: err.name,
      message: err.message,
      //   stack:err.stack,
    };

    logger.error({
      message: err.message,
      error: err,
      __filename,
      stack: err.stack,
    });
    res.status(500);
    res.json(response);
  }
};
